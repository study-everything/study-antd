/*
 * @Author: dfh
 * @Date: 2022-06-05 13:18:36
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import * as React from 'react';
import { RawList } from './List';

const List = React.forwardRef((props, ref) => RawList({ ...props,
  virtual: false
}, ref));
List.displayName = 'List';
export default List;