import * as React from 'react';
import type { ColumnsType, ColumnType } from '../interface';
import { EXPAND_COLUMN } from '../constant';

function flatColumns<RecordType>(columns: ColumnsType<RecordType>): ColumnType<RecordType>[] {
  return columns.reduce((list, column) => {
    const { fixed } = column;
    const parsedFixed = fixed === true ? 'left' : fixed;

    // const subColumns = column.children;
    // if (subColumns && subColumns.length > 0) {
    // }
    return [
      ...list,
      {
        ...column,
        fixed: parsedFixed,
      },
    ];
  }, []);
}

function revertForRtl(columns) {
  return columns;
}

function useColumns(
  { columns, children, expandable, expandedKeys, getRowKey, expandIcon, direction },
  transformColumns,
) {
  const baseColumns = React.useMemo(() => columns, [columns, children]);

  // ========================== Expand ==========================
  const withExpandColumns = React.useMemo(() => {
    if (expandable) {
      let cloneColumns = baseColumns.slice();
    }
    return baseColumns.filter(col => col !== EXPAND_COLUMN);
  }, [expandable, baseColumns, getRowKey, expandedKeys, expandIcon, direction]);

  // ========================= Transform ========================
  const mergedColumns = React.useMemo(() => {
    let finalColumns = withExpandColumns;
    if (transformColumns) {
      finalColumns = transformColumns(finalColumns);
    }

    if (!finalColumns.length) {
      finalColumns = [
        {
          render: () => null,
        },
      ];
    }
    return finalColumns;
  }, [transformColumns, withExpandColumns, direction]);

  // ========================== Flatten =========================
  const flattenColumns = React.useMemo(() => {
    if (direction === 'rtl') {
      return revertForRtl(flatColumns(mergedColumns));
    }
    return flatColumns(mergedColumns);
  }, [mergedColumns, direction]);
  return [mergedColumns, flattenColumns];
}

export default useColumns;
