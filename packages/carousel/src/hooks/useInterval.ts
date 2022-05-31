import { useEffect, useRef } from 'react';
import useEvent from './useEvent';

export default function useInterval(cb: Function, delay: number = 0, autoStart: boolean = false) {
  const ref = useRef(cb);
  const intervalRef = useRef(null);
  ref.current = cb;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (autoStart) {
      intervalRef.current = setInterval(() => {
        ref.current();
      }, delay);
      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [autoStart, delay]);

  const pause = useEvent(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  });

  const start = useEvent((d?: number) => {
    pause();
    intervalRef.current = setInterval(() => {
      ref.current();
    }, d || delay);
  });

  return { start, pause };
}
