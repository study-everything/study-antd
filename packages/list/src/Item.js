/*
 * @Author: dfh
 * @Date: 2022-06-05 13:15:22
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import * as React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function Item({
  children,
  setRef
}) {
  const refFunc = React.useCallback(node => {
    setRef(node);
  }, []);
  return React.cloneElement(children, {
    ref: refFunc
  });
}