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

export interface CarouselProps {
  prefixCls?: string;
  className?: string;
  autoplay?: boolean;
  dotPosition?: 'top' | 'bottom' | 'left' | 'right';
  dots?: string | { className?: string };
  easing?: 'linear';
  effect?: 'scrollx' | 'fade';
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
  const { prefixCls = 'ant', dotPosition = 'bottom', className } = props;
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

  useImperativeHandle(ref, () => ({
    goTo(slideNumber: number, dontAnimate: boolean) {
      if (dontAnimate) {
        setTransition(false);
        carouselRef.current.style.transition = 'none';
      }
      if (slideNumber < 0 || slideNumber > Children.count(props.children)) {
        throw new Error('超出了边界');
      }
      let buf = 0;
      if (current > Children.count(props.children)) {
        buf += Children.count(props.children);
      }
      setCurrent(buf + slideNumber + 1);
    },
    next() {
      setTransition(true);
      setCurrent(prev => {
        const next = prev + 1;

        return next;
      });
    },
    prev() {
      setTransition(true);
      setCurrent(prev => {
        const next = prev - 1;

        return next;
      });
    },
  }));

  const handleTransitionEnd = useEvent(() => {
    if (current >= carouselItemCount - 1 || current <= 0) {
      setTransition(false);
      setCurrent(Children.count(props.children));
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
          ...(!isTransition ? { transition: 'none' } : {}),
        }}
      >
        {newChildren}
      </div>

      <CarouselDot
        current={dotActive}
        length={Children.count(props.children)}
        prefixCls={prefixCls}
        position={dotPosition}
        onChange={setCurrent}
      />
    </div>
  );
};

export default forwardRef(Carousel);
