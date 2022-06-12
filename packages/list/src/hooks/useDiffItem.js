/*
 * @Author: dfh
 * @Date: 2022-06-05 13:11:03
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import * as React from 'react';
import { findListDiffIndex } from '../utils/algorithmUtil';

export default function useDiffItem(data, getKey, onDiff) {
  const [prevData, setPrevData] = React.useState(data);
  const [diffItem, setDiffItem] = React.useState(null);
  React.useEffect(() => {
    const diff = findListDiffIndex(prevData || [], data || [], getKey);

    if (diff?.index !== undefined) {
      onDiff?.(diff.index);
      setDiffItem(data[diff.index]);
    }

    setPrevData(data);
  }, [data]);
  return [diffItem];
}