/*
 * @Author: dfh
 * @Date: 2022-06-05 13:18:23
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import * as React from 'react';
import { Item } from '../Item';

export default function useChildren(list, startIndex, endIndex, setNodeRef, renderFunc, {
  getKey
}) {
  return list.slice(startIndex, endIndex + 1).map((item, index) => {
    const eleIndex = startIndex + index;
    const node = renderFunc(item, eleIndex, {});
    const key = getKey(item);
    return (<Item key={key} setRef={ele => setNodeRef(item, ele)}>
        {node}
      </Item>);
  });
}