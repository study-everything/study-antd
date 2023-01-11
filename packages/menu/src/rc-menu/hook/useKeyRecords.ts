import { useRef } from 'react';

const PATH_SPLIT = '__RC_UTIL_PATH_SPLIT__';

const getPathStr = (keyPath: string[]) => keyPath.join(PATH_SPLIT);
const getPathKeys = (keyPathStr: string) => keyPathStr.split(PATH_SPLIT);

export const OVERFLOW_KEY = 'rc-menu-more';

export default function useKeyRecords() {
  const key2pathRef = useRef(new Map<string, string>());
  const path2keyRef = useRef(new Map<string, string>());

  const registerPath = (key: string, keyPath) => {
    const connectedPath = getPathStr(keyPath);

    path2keyRef.current.set(connectedPath, key);
    key2pathRef.current.set(key, connectedPath);
  };
  
  const unregisterPath = (key:string, keyPath) => {
    const connectedPath = getPathStr(keyPath);
    path2keyRef.current.delete(connectedPath);
    key2pathRef.current.delete(key);
  };

  const getKeyPath = (eventKey: string, includeOverflow?: boolean) => {
    const fullPath = key2pathRef.current.get(eventKey) || '';
   
    
    const keys = getPathKeys(fullPath);

    // if (includeOverflow && overflowKeys.includes(keys[0])) {
    //   keys.unshift(OVERFLOW_KEY);
    // }

    return keys;
  };

  const isSubPathKey = (pathKeys: string[], eventKey: string) =>
    pathKeys.some(pathKey => {
      const pathKeyList = getKeyPath(pathKey, true);
      return pathKeyList.includes(eventKey);
    });

  return { registerPath, unregisterPath, isSubPathKey, getKeyPath };
}
