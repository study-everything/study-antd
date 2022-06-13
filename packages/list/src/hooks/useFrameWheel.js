/*
 * @Author: dfh
 * @Date: 2022-06-05 13:14:42
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import { useRef } from 'react';
import raf from 'rc-util/lib/raf';
import isFF from '../utils/isFirefox';
import useOriginScroll from './useOriginScroll';

export default function useFrameWheel(inVirtual, isScrollAtTop, isScrollAtBottom, onWheelDelta) {
  const offsetRef = useRef(0);
  const nextFrameRef = useRef(null);
  const wheelValueRef = useRef(null);
  const isMouseScrollRef = useRef(false);
  const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);

  function onWheel(event) {
    if (!inVirtual) return;
    raf.cancel(nextFrameRef.current);
    const {
      deltaY
    } = event;
    offsetRef.current += deltaY;
    wheelValueRef.current = deltaY;
    if (originScroll(deltaY)) return;

    if (!isFF) {
      event.preventDefault();
    }

    nextFrameRef.current = raf(() => {
      const patchMultiple = isMouseScrollRef.current ? 10 : 1;
      onWheelDelta(offsetRef.current * patchMultiple);
      offsetRef.current = 0;
    });
  }

  function onFireFoxScroll(event) {
    if (!inVirtual) return;
    isMouseScrollRef.current = event.detail === wheelValueRef.current;
  }

  return [onWheel, onFireFoxScroll];
}