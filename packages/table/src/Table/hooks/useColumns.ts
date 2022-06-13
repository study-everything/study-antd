import * as React from 'react';
import type {
  ColumnsType,
  ColumnType,
  FixedType,
  Key,
  GetRowKey,
  TriggerEventHandler,
  RenderExpandIcon,
  ColumnGroupType,
} from '../interface';
import { INTERNAL_COL_DEFINE } from '../utils/legacyUtil';
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

function useColumns<RecordType>(
  {
    prefixCls,
    columns,
    children,
    expandable,
    expandedKeys,
    getRowKey,
    onTriggerExpand,
    expandIcon,
    rowExpandable,
    expandIconColumnIndex,
    direction,
    expandRowByClick,
    columnWidth,
    fixed,
  }: {
    prefixCls?: string;
    columns?: ColumnsType<RecordType>;
    children?: React.ReactNode;
    expandable: boolean;
    expandedKeys: Set<Key>;
    getRowKey: GetRowKey<RecordType>;
    onTriggerExpand: TriggerEventHandler<RecordType>;
    expandIcon?: RenderExpandIcon<RecordType>;
    rowExpandable?: (record: RecordType) => boolean;
    expandIconColumnIndex?: number;
    direction?: 'ltr' | 'rtl';
    expandRowByClick?: boolean;
    columnWidth?: number | string;
    fixed?: FixedType;
  },
  transformColumns: (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>,
) {
  const baseColumns = React.useMemo(() => columns, [columns, children]);

  // ========================== Expand ==========================
  const withExpandColumns = React.useMemo(() => {
    if (expandable) {
      let cloneColumns = baseColumns.slice();
      if (!cloneColumns.includes(EXPAND_COLUMN)) {
        const expandColIndex = expandIconColumnIndex || 0;
        if (expandColIndex >= 0) {
          cloneColumns.splice(expandColIndex, 0, EXPAND_COLUMN);
        }
      }

      const expandColumnIndex = cloneColumns.indexOf(EXPAND_COLUMN);
      cloneColumns = cloneColumns.filter(
        (column, index) => column !== EXPAND_COLUMN || index === expandColumnIndex,
      );

      const prevColumn = baseColumns[expandColumnIndex];

      let fixedColumn: FixedType | null = null;

      const expandColumn = {
        [INTERNAL_COL_DEFINE]: {
          className: `${prefixCls}-expand-icon-col`,
          columnType: 'EXPAND_COLUMN',
        },
        title: '',
        className: `${prefixCls}-row-expand-icon-cell`,
        width: columnWidth,
        render: (_, record, index) => {
          const rowKey = getRowKey(record, index);
          const expanded = expandedKeys.has(rowKey);
          const recordExpandable = rowExpandable ? rowExpandable(record) : true;

          const icon = expandIcon({
            prefixCls,
            expanded,
            expandable: recordExpandable,
            record,
            onExpand: onTriggerExpand,
          });
          return icon;
        },
      };

      return cloneColumns.map(col => (col === EXPAND_COLUMN ? expandColumn : col));
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
