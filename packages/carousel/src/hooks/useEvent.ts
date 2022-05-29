import { useCallback, useRef } from 'react';

export default function useEvent<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  const cb = useCallback((...args: Parameters<T>) => {
    if (fnRef.current) {
      fnRef.current(...args);
    }
  }, []);

  return cb;
}
