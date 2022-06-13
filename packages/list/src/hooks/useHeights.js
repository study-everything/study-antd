/*
 * @Author: dfh
 * @Date: 2022-06-05 13:18:28
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import * as React from 'react';
import { useRef, useEffect } from 'react';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import raf from 'rc-util/lib/raf';
import CacheMap from '../utils/CacheMap';

export default function useHeights(getKey, onItemAdd, onItemRemove) {
  const [updatedMark, setUpdatedMark] = React.useState(0);
  const instanceRef = useRef(new Map());
  const heightsRef = useRef(new CacheMap());
  const collectRafRef = useRef();

  function cancelRaf() {
    raf.cancel(collectRafRef.current);
  }

  function collectHeight() {
    cancelRaf();
    collectRafRef.current = raf(() => {
      instanceRef.current.forEach((element, key) => {
        if (element && element.offsetParent) {
          const htmlElement = findDOMNode(element);
          const {
            offsetHeight
          } = htmlElement;

          if (heightsRef.current.get(key) !== offsetHeight) {
            heightsRef.current.set(key, htmlElement.offsetHeight);
          }
        }
      });
      setUpdatedMark(c => c + 1);
    });
  }

  function setInstanceRef(item, instance) {
    const key = getKey(item);
    const origin = instanceRef.current.get(key);

    if (instance) {
      instanceRef.current.set(key, instance);
      collectHeight();
    } else {
      instanceRef.current.delete(key);
    }

    if (!origin !== !instance) {
      if (instance) {
        onItemAdd?.(item);
      } else {
        onItemRemove?.(item);
      }
    }
  }

  useEffect(() => {
    return cancelRaf;
  }, []);
  return [setInstanceRef, collectHeight, heightsRef.current, updatedMark];
}