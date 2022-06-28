import * as React from 'react';
import classNames from 'classnames';
import { fillRef } from 'rc-util/lib/ref';
import TableContext from '../context/TableContext';
import type { ColumnsType, ColumnType } from '../interface';
import ColGroup from '../ColGroup';

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
    const { prefixCls, scrollbarSize, isSticky } = React.useContext(TableContext);

    const combinationScrollBarSize = isSticky && !fixHeader ? 0 : scrollbarSize;
    // const scrollRef = React.useRef<HTMLDivElement>(null);

    const setScrollRef = React.useCallback((element: HTMLElement) => {
      fillRef(ref, element);
      // fillRef(scrollRef, element);
    }, []);

    React.useEffect(() => {
      function onWheel(e: WheelEvent) {
        const { currentTarget, deltaX } = e as unknown as React.WheelEvent<HTMLDivElement>;
        if (deltaX) {
          onScroll({ currentTarget, scrollLeft: currentTarget.scrollLeft + deltaX });
          e.preventDefault();
        }
      }

      ref.current?.addEventListener('wheel', onWheel);
      return () => {
        ref.current?.removeEventListener('wheel', onWheel);
      };
    }, []);

    const mergedColumnWidth = useColumnWidth(colWidths, columnCount);

    const lastColumn = flattenColumns[flattenColumns.length - 1];
    const ScrollBarColumn: ColumnType<unknown> & { scrollbar: true } = {
      fixed: lastColumn ? lastColumn.fixed : null,
      scrollbar: true,
      onHeaderCell: () => ({
        className: `${prefixCls}-cell-scrollbar`,
      }),
    };

    const columnsWithScrollbar = React.useMemo(
      () => (combinationScrollBarSize ? [...columns, ScrollBarColumn] : columns),
      [combinationScrollBarSize, columns],
    );

    const flattenColumnsWithScrollbar = React.useMemo(
      () => (combinationScrollBarSize ? [...flattenColumns, ScrollBarColumn] : flattenColumns),
      [combinationScrollBarSize, flattenColumns],
    );

    const headerStickyOffsets = React.useMemo(() => {
      const { right, left } = stickyOffsets;
      return {
        ...stickyOffsets,
        left,
        right: [...right.map(width => width + combinationScrollBarSize), 0],
        isSticky,
      };
    }, [combinationScrollBarSize, stickyOffsets, isSticky]);

    return (
      <div
        style={{
          overflow: 'hidden',
          ...(isSticky ? { top: stickyTopOffset, bottom: stickyBottomOffset } : {}),
        }}
        ref={setScrollRef}
        className={classNames(className, {
          [stickyClassName]: !!stickyClassName,
        })}
      >
        <table
          style={{
            tableLayout: 'fixed',
            visibility: noData || mergedColumnWidth ? null : 'hidden',
          }}
        >
          <ColGroup
            colWidth={mergedColumnWidth ? [...mergedColumnWidth, combinationScrollBarSize] : []}
            columns={flattenColumnsWithScrollbar}
            columCount={columnCount + 1}
          />
          {children({
            ...props,
            stickyOffsets: headerStickyOffsets,
            columns: columnsWithScrollbar,
            flattenColumns: flattenColumnsWithScrollbar,
          })}
        </table>
      </div>
    );
  },
);

FixedHolder.displayName = 'FixedHolder';

export default FixedHolder;
