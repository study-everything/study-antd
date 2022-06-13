import * as React from 'react';
import raf from 'rc-util/lib/raf';

export default function useScrollTo(containerRef, data, heights, itemHeight, getKey, collectHeight, syncScrollTop, triggerFlash) {
  const scrollRef = React.useRef();
  return arg => {
    if (arg === null || arg === undefined) {
      triggerFlash();
      return;
    }

    raf.cancel(scrollRef.current);

    if (typeof arg === 'number') {
      syncScrollTop(arg);
    } else if (arg && typeof arg === 'object') {
      let index;
      const {
        align
      } = arg;

      if ('index' in arg) {
        ({
          index
        } = arg);
      } else {
        index = data.findIndex(item => getKey(item) === arg.key);
      }

      const {
        offset = 0
      } = arg;

      const syncScroll = (times, targetAlign) => {
        if (times < 0 || !containerRef.current) return;
        const height = containerRef.current.clientHeight;
        let needCollectHeight = false;
        let newTargetAlign = targetAlign;

        if (height) {
          const mergedAlign = targetAlign || align;
          let stackTop = 0;
          let itemTop = 0;
          let itemBottom = 0;
          const maxLen = Math.min(data.length, index);

          for (let i = 0; i <= maxLen; i += 1) {
            const key = getKey(data[i]);
            itemTop = stackTop;
            const cacheHeight = heights.get(key);
            itemBottom = itemTop + (cacheHeight === undefined ? itemHeight : cacheHeight);
            stackTop = itemBottom;

            if (i === index && cacheHeight === undefined) {
              needCollectHeight = true;
            }
          }

          let targetTop = null;

          switch (mergedAlign) {
            case 'top':
              targetTop = itemTop - offset;
              break;

            case 'bottom':
              targetTop = itemBottom - height + offset;
              break;

            default:
              {
                const {
                  scrollTop
                } = containerRef.current;
                const scrollBottom = scrollTop + height;

                if (itemTop < scrollTop) {
                  newTargetAlign = 'top';
                } else if (itemBottom > scrollBottom) {
                  newTargetAlign = 'bottom';
                }
              }
          }

          if (targetTop !== null && targetTop !== containerRef.current.scrollTop) {
            syncScrollTop(targetTop);
          }
        }

        scrollRef.current = raf(() => {
          if (needCollectHeight) {
            collectHeight();
          }

          syncScroll(times - 1, newTargetAlign);
        });
      };

      syncScroll(3);
    }
  };
}