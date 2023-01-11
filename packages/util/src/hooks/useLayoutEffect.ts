import React, { useRef } from 'react';

const useLayoutEffect = React.useEffect;

export default useLayoutEffect;

export const useLayoutUpdateEffect = (callback, deps) => {
  const firstMountRef = useRef(true);

  useLayoutEffect(() => {
    if (!firstMountRef.current) {
      return callback();
    }
  }, deps);

  useLayoutEffect(() => {
    firstMountRef.current = false;

    return () => {
      firstMountRef.current = true;
    };
  }, []);
};
