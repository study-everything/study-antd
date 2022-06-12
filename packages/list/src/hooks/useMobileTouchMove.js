/*
 * @Author: dfh
 * @Date: 2022-06-05 13:15:06
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import { useRef } from 'react';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

const SMOOTH_PTG = 14 / 15;
export default function useMobileTouchMove(inVirtual, listRef, callback) {
  const touchedRef = useRef(false);
  const touchYRef = useRef(0);
  const elementRef = useRef(null);
  const intervalRef = useRef(null);
  let cleanUpEvents;

  const onTouchMove = e => {
    if (touchedRef.current) {
      const currentY = Math.ceil(e.touches[0].pageY);
      let offsetY = touchYRef.current - currentY;
      touchYRef.current = currentY;

      if (callback(offsetY)) {
        e.preventDefault();
      }

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        offsetY *= SMOOTH_PTG;

        if (!callback(offsetY, true) || Math.abs(offsetY) <= 0.1) {
          clearInterval(intervalRef.current);
        }
      }, 16);
    }
  };

  const onTouchEnd = () => {
    touchedRef.current = false;
    cleanUpEvents();
  };

  const onTouchStart = e => {
    cleanUpEvents();

    if (e.touches.length === 1 && !touchedRef.current) {
      touchedRef.current = true;
      touchYRef.current = Math.ceil(e.touches[0].pageY);
      elementRef.current = e.target;
      elementRef.current.addEventListener('touchmove', onTouchMove);
      elementRef.current.addEventListener('touchend', onTouchEnd);
    }
  };

  cleanUpEvents = () => {
    if (elementRef.current) {
      elementRef.current.removeEventListener('touchmove', onTouchMove);
      elementRef.current.removeEventListener('touchend', onTouchEnd);
    }
  };

  useLayoutEffect(() => {
    if (inVirtual) {
      listRef.current.addEventListener('touchstart', onTouchStart);
    }

    return () => {
      listRef.current?.removeEventListener('touchstart', onTouchStart);
      cleanUpEvents();
      clearInterval(intervalRef.current);
    };
  }, [inVirtual]);
}