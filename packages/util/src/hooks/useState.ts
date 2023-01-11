import { useEffect, useRef, useState } from 'react';

export default function useSafeState(defaultValue) {
  const destoryRef = useRef(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    destoryRef.current = false;

    return () => {
      destoryRef.current = true;
    };
  }, []);

  function safeSetState(updater, ignoreDestroy) {
    if (ignoreDestroy && destoryRef.current) {
      return;
    }

    setValue(updater);
  }

  return [value, safeSetState];
}
