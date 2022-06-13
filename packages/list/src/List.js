import * as React from 'react';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import Filler from './Filler';
import ScrollBar from './ScrollBar';
import useChildren from './hooks/useChildren';
import useHeights from './hooks/useHeights';
import useScrollTo from './hooks/useScrollTo';
import useDiffItem from './hooks/useDiffItem';
import useFrameWheel from './hooks/useFrameWheel';
import useMobileTouchMove from './hooks/useMobileTouchMove';
import useOriginScroll from './hooks/useOriginScroll';

const EMPTY_DATA = [];
const ScrollStyle = {
  overflowY: 'auto',
  overflowAnchor: 'none'
};
export function RawList(props, ref) {
  const {
    prefixCls = 'rc-virtual-list',
    className,
    height,
    itemHeight,
    fullHeight = true,
    style,
    data,
    children,
    itemKey,
    virtual,
    component: Component = 'div',
    onScroll,
    onVisibleChange,
    ...restProps
  } = props;
  const useVirtual = !!(virtual !== false && height && itemHeight);
  const inVirtual = useVirtual && data && itemHeight * data.length > height;
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollMoving, setScrollMoving] = useState(false);
  const mergedClassName = classNames(prefixCls, className);
  const mergedData = data || EMPTY_DATA;
  const componentRef = useRef();
  const fillerInnerRef = useRef();
  const scrollBarRef = useRef();
  const getKey = React.useCallback(item => {
    if (typeof itemKey === 'function') {
      return itemKey(item);
    }

    return item?.[itemKey];
  }, [itemKey]);
  const sharedConfig = {
    getKey
  };

  function syncScrollTop(newTop) {
    setScrollTop(origin => {
      let value;

      if (typeof newTop === 'function') {
        value = newTop(origin);
      } else {
        value = newTop;
      }

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const alignedTop = keepInRange(value);
      componentRef.current.scrollTop = alignedTop;
      return alignedTop;
    });
  }

  const rangeRef = useRef({
    start: 0,
    end: mergedData.length
  });
  const diffItemRef = useRef();
  const [diffItem] = useDiffItem(mergedData, getKey);
  diffItemRef.current = diffItem;
  const [setInstanceRef, collectHeight, heights, heightUpdatedMark] = useHeights(getKey, null, null);
  const {
    scrollHeight,
    start,
    end,
    offset
  } = React.useMemo(() => {
    if (!useVirtual) {
      return {
        scrollHeight: undefined,
        start: 0,
        end: mergedData.length - 1,
        offset: undefined
      };
    }

    if (!inVirtual) {
      return {
        scrollHeight: fillerInnerRef.current?.offsetHeight || 0,
        start: 0,
        end: mergedData.length - 1,
        offset: undefined
      };
    }

    let itemTop = 0;
    let startIndex;
    let startOffset;
    let endIndex;
    const dataLen = mergedData.length;

    for (let i = 0; i < dataLen; i += 1) {
      const item = mergedData[i];
      const key = getKey(item);
      const cacheHeight = heights.get(key);
      const currentItemBottom = itemTop + (cacheHeight === undefined ? itemHeight : cacheHeight);

      if (currentItemBottom >= scrollTop && startIndex === undefined) {
        startIndex = i;
        startOffset = itemTop;
      }

      if (currentItemBottom > scrollTop + height && endIndex === undefined) {
        endIndex = i;
      }

      itemTop = currentItemBottom;
    }

    if (startIndex === undefined) {
      startIndex = 0;
      startOffset = 0;
    }

    if (endIndex === undefined) {
      endIndex = mergedData.length - 1;
    }

    endIndex = Math.min(endIndex + 1, mergedData.length);
    return {
      scrollHeight: itemTop,
      start: startIndex,
      end: endIndex,
      offset: startOffset
    };
  }, [inVirtual, useVirtual, scrollTop, mergedData, heightUpdatedMark, height]);
  rangeRef.current.start = start;
  rangeRef.current.end = end;
  const maxScrollHeight = scrollHeight - height;
  const maxScrollHeightRef = useRef(maxScrollHeight);
  maxScrollHeightRef.current = maxScrollHeight;

  function keepInRange(newScrollTop) {
    let newTop = newScrollTop;

    if (!Number.isNaN(maxScrollHeightRef.current)) {
      newTop = Math.min(newTop, maxScrollHeightRef.current);
    }

    newTop = Math.max(newTop, 0);
    return newTop;
  }

  const isScrollAtTop = scrollTop <= 0;
  const isScrollAtBottom = scrollTop >= maxScrollHeight;
  const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);

  function onScrollBar(newScrollTop) {
    const newTop = newScrollTop;
    syncScrollTop(newTop);
  }

  function onFallbackScroll(e) {
    const {
      scrollTop: newScrollTop
    } = e.currentTarget;

    if (newScrollTop !== scrollTop) {
      syncScrollTop(newScrollTop);
    }

    onScroll?.(e);
  }

  const [onRawWheel, onFireFoxScroll] = useFrameWheel(useVirtual, isScrollAtTop, isScrollAtBottom, offsetY => {
    syncScrollTop(top => {
      const newTop = top + offsetY;
      return newTop;
    });
  });
  useMobileTouchMove(useVirtual, componentRef, (deltaY, smoothOffset) => {
    if (originScroll(deltaY, smoothOffset)) {
      return false;
    }

    onRawWheel({
      preventDefault() {},

      deltaY
    });
    return true;
  });
  useLayoutEffect(() => {
    function onMozMousePixelScroll(e) {
      if (useVirtual) {
        e.preventDefault();
      }
    }

    componentRef.current.addEventListener('wheel', onRawWheel);
    componentRef.current.addEventListener('DOMMouseScroll', onFireFoxScroll);
    componentRef.current.addEventListener('MozMousePixelScroll', onMozMousePixelScroll);
    return () => {
      if (componentRef.current) {
        componentRef.current.removeEventListener('wheel', onRawWheel);
        componentRef.current.removeEventListener('DOMMouseScroll', onFireFoxScroll);
        componentRef.current.removeEventListener('MozMousePixelScroll', onMozMousePixelScroll);
      }
    };
  }, [useVirtual]);
  const scrollTo = useScrollTo(componentRef, mergedData, heights, itemHeight, getKey, collectHeight, syncScrollTop, () => {
    scrollBarRef.current?.delayHidden();
  });
  React.useImperativeHandle(ref, () => ({
    scrollTo
  }));
  useLayoutEffect(() => {
    if (onVisibleChange) {
      const renderList = mergedData.slice(start, end + 1);
      onVisibleChange(renderList, mergedData);
    }
  }, [start, end, mergedData]);
  const listChildren = useChildren(mergedData, start, end, setInstanceRef, children, sharedConfig);
  let componentStyle = null;

  if (height) {
    componentStyle = {
      [fullHeight ? 'height' : 'maxHeight']: height,
      ...ScrollStyle
    };

    if (useVirtual) {
      componentStyle.overflowY = 'hidden';

      if (scrollMoving) {
        componentStyle.pointerEvents = 'none';
      }
    }
  }

  return (<div style={{ ...style,
    position: 'relative'
  }} className={mergedClassName} {...restProps}>
      <Component className={`${prefixCls}-holder`} style={componentStyle} ref={componentRef} onScroll={onFallbackScroll}>
        <Filler prefixCls={prefixCls} height={scrollHeight} offset={offset} onInnerResize={collectHeight} ref={fillerInnerRef}>
          {listChildren}
        </Filler>
      </Component>

      {useVirtual && <ScrollBar ref={scrollBarRef} prefixCls={prefixCls} scrollTop={scrollTop} height={height} scrollHeight={scrollHeight} count={mergedData.length} onScroll={onScrollBar} onStartMove={() => {
      setScrollMoving(true);
    }} onStopMove={() => {
      setScrollMoving(false);
    }} />}
    </div>);
}
const List = React.forwardRef(RawList);
List.displayName = 'List';
export default List;