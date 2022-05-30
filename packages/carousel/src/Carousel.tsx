import type { PropsWithChildren, ForwardRefRenderFunction } from 'react';
import React, {
  useImperativeHandle,
  forwardRef,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
  Children,
} from 'react';
import classNames from 'classnames';
import CarouselItem from './CarouselItem';
import CarouselDot from './Dots';
import useEvent from './hooks/useEvent';
import useInterval from './hooks/useInterval';

export interface CarouselProps {
  prefixCls?: string;
  className?: string;
  autoplay?: boolean;
  dotPosition?: 'top' | 'bottom' | 'left' | 'right';
  dots?: boolean | { className?: string };
  /**
   * transition动画方式
   */
  easing?: string;
  // effect?: 'scrollx' | 'fade';
  afterChange?: (current: number) => void;
  beforeChange?: (from: number, to: number) => void;
}

export interface CarouselRef {
  goTo(slideNumber: number, dontAnimate?: boolean): void;
  next(): void;
  prev(): void;
}

const Carousel: ForwardRefRenderFunction<CarouselRef, PropsWithChildren<CarouselProps>> = (
  props,
  ref,
) => {
  const {
    prefixCls = 'ant',
    dotPosition = 'bottom',
    className,
    autoplay = true,
    easing = 'linear',
    dots = true,
  } = props;
  const transitioning = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const [itemW, setItemW] = useState(0);
  const [isTransition, setTransition] = useState(true);

  const dotActive = useMemo(() => {
    const t = current % Children.count(props.children);
    if (t === 0) {
      return Children.count(props.children) - 1;
    }
    return t - 1;
  }, [props.children, current]);

  const carouselItems = useMemo(() => {
    const childrenArr = Children.toArray(props.children);
    childrenArr.push(...childrenArr);
    childrenArr.unshift(childrenArr[childrenArr.length - 1]);
    return childrenArr;
  }, [props.children]);

  const carouselItemCount = useMemo(() => carouselItems.length, []);

  const warperW = useMemo(() => {
    const width = itemW * carouselItems.length;
    return width;
  }, [itemW, carouselItems.length]);

  const newChildren = carouselItems.map((child: React.ReactElement, index: number) => (
    // eslint-disable-next-line react/no-array-index-key
    <CarouselItem prefixCls={prefixCls} key={index} style={{ width: itemW }}>
      {child}
    </CarouselItem>
  ));

  const cls = classNames(
    {
      [`${prefixCls}-carousel`]: true,
    },
    className,
  );

  useLayoutEffect(() => {
    const { width } = carouselRef.current.getBoundingClientRect();
    setItemW(width);
  }, []);

  const goTo = useEvent((dir: 'prev' | 'next' | number, needTransition: boolean = true) => {
    if (transitioning.current) {
      return;
    }
    let next: number = 0;

    if (typeof dir === 'number') {
      if (dir < 0 || dir > Children.count(props.children)) {
        throw new Error('超出了边界');
      }
      let buf = 0;
      if (current > Children.count(props.children)) {
        buf += Children.count(props.children);
      }
      next = buf + dir + 1;
    } else if (dir === 'prev') {
      next = current - 1;
    } else if (dir === 'next') {
      next = current + 1;
    }

    transitioning.current = needTransition;
    setTransition(needTransition);
    props.beforeChange?.(current, next);
    setCurrent(next);
  });

  const { start, pause } = useInterval(() => goTo('next'), 3000, autoplay);

  useImperativeHandle(ref, () => ({
    goTo(slideNumber: number, dontAnimate: boolean) {
      pause();
      goTo(slideNumber, !dontAnimate);
    },
    next: () => {
      pause();
      goTo('next');
    },
    prev: () => {
      pause();
      goTo('prev');
    },
  }));

  const handleTransitionEnd = useEvent(() => {
    transitioning.current = false;
    if (autoplay) {
      start();
    }
    if (current >= carouselItemCount - 1 || current <= 0) {
      goTo(Children.count(props.children) - 1, false);
    }
  });

  return (
    <div className={cls} ref={carouselRef}>
      <div
        onTransitionEnd={handleTransitionEnd}
        ref={carouselWrapRef}
        className={classNames({
          [`${prefixCls}-carousel-warper`]: true,
        })}
        style={{
          width: warperW,
          transform: `translateX(-${itemW * current}px)`,
          transition: isTransition ? `transform  0.35s ${easing}` : 'none',
        }}
      >
        {newChildren}
      </div>

      {!!dots && (
        <CarouselDot
          current={dotActive}
          length={Children.count(props.children)}
          prefixCls={prefixCls}
          position={dotPosition}
          onChange={goTo}
          className={typeof dots === 'boolean' ? '' : dots.className}
        />
      )}
    </div>
  );
};

export default forwardRef(Carousel);
