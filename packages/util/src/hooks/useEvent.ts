import { useCallback, useRef } from 'react';

export default function useEvent(callback) {
  const fnRef = useRef();
  fnRef.current = callback;
  
  const memoFn = useCallback((...args) => fnRef.current?.(...args), []);

  return memoFn;
}
