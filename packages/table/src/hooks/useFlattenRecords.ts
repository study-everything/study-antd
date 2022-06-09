import * as React from 'react';

export default function useFlattenRecords(data, expandedKeys) {
  const arr = React.useMemo(() => {
    if (expandedKeys?.size) {
      const temp = [];
      return temp;
    }
    return data?.map((item, index) => ({
      record: item,
      indent: 0,
      index,
    }));
  }, [data]);
  return arr;
}
