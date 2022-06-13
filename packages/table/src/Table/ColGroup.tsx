import * as React from 'react';
import type { ColumnType } from './interface';
import { INTERNAL_COL_DEFINE } from './utils/legacyUtil';

export interface ColGroupProps<T> {
  colWidth: readonly (number | string)[];
  columns?: readonly ColumnType<T>[];
  columCount?: number;
}

const ColGroup: <RecordType>({
  colWidth,
  columns,
  columCount,
}: ColGroupProps<RecordType>) => JSX.Element = ({ colWidth, columns, columCount }) => {
  const cols: React.ReactElement[] = [];
  const len = columCount || columns.length;

  let mustInsert = false;
  for (let i = 0; i < len; i++) {
    const width = colWidth[i];
    const column = columns && columns[i];
    const additionalProps = column && column[INTERNAL_COL_DEFINE];

    if (width || additionalProps || mustInsert) {
      const { columnType, ...restAdditionalProps } = additionalProps || {};
      cols.push(<col key={i} style={{ width }} {...restAdditionalProps} />);
      mustInsert = true;
    }
  }

  return <colgroup>{cols}</colgroup>;
};

export default ColGroup;
