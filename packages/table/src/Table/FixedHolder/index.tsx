import * as React from 'react';
import TableContext from '../context/TableContext';
import type { ColumnsType, ColumnType } from '../interface';

function useColumnWidth(colWidths: readonly number[], columnCount: number) {
  return React.useMemo(() => {
    const cloneColumns: number[] = [];
    for (let i = 0; i < columnCount; i++) {
      const val = colWidths[i];
      if (val !== undefined) {
        cloneColumns[i] = val;
      } else {
        return null;
      }
    }
    return cloneColumns;
  }, [colWidths.join('_'), columnCount]);
}

export interface FixedHeaderProps<RecordType> extends HeaderProps<RecordType> {
  className: string;
  noData: boolean;
  maxContentScroll: boolean;
  colWidths: readonly number[];
  columCount: number;
  direction: 'ltr' | 'rtl';
  fixHeader: boolean;
  stickyTopOffset?: number;
  stickyBottomOffset?: number;
  stickyClassName?: string;
  onScroll: (info: { currentTarget: HTMLDivElement; scrollLeft?: number }) => void;
  children: (info: HeaderProps<RecordType>) => React.ReactNode;
}

const FixedHolder = React.forwardRef<HTMLDivElement, FixedHeaderProps<unknown>>(
  (
    {
      className,
      noData,
      columns,
      flattenColumns,
      colWidths,
      columnCount,
      stickyOffsets,
      direction,
      fixHeader,
      stickyTopOffset,
      stickyBottomOffset,
      stickyClassName,
      onScroll,
      maxContentScroll,
      children,
      ...props
    },
    ref,
  ) => {
    const { prefixCls } = React.useContext(TableContext);

    const mergedColumnWidth = useColumnWidth(colWidths, columnCount);

    return (
      <div
        style={{
          overflow: 'hidden',
        }}
      >
        <table
          style={{
            tableLayout: 'fixed',
            visibility: noData || mergedColumnWidth ? null : 'hidden',
          }}
        >
          {children({
            ...props,
          })}
        </table>
      </div>
    );
  },
);

FixedHolder.displayName = 'FixedHolder';

export default FixedHolder;
