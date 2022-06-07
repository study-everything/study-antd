import React, { useMemo } from 'react';
import classNames from 'classnames';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import Body from './Body';
import ResizeContext from './context/ResizeContext';
import { getPathValue, mergeObject } from './utils/valueUtil';
import Header from './Header/Header';
import type { GetComponent, TableComponents, DefaultRecordType } from './interface';
import useColumns from './hooks/useColumns';

// Used for conditions cache
const EMPTY_DATA = [];

export interface TableProps<RecordType = unknown> {
  prefixCls?: string;
  className?: string;
  columns: any[];
  data: readonly RecordType[];
}

const MemoTableContext = React.memo(({ children }) => children);

function Table<RecordType extends DefaultRecordType>(props: TableProps<RecordType>) {
  const {
    prefixCls,
    className,
    rowClassName,
    style,
    data,
    rowKey,
    scroll,
    tableLayout,
    direction,

    // Customize
    showHeader,
    components,
  } = props;

  const mergedData = data || EMPTY_DATA;
  const hasData = !!mergedData.length;

  //  ==================== Customize =====================
  const mergedComponents = React.useMemo(
    () => mergeObject<TableComponents<RecordType>>(components, {}),
    [components],
  );

  const getComponent = React.useCallback<GetComponent>(
    (path, defaultComponent) => getPathValue(mergedComponents, path) || defaultComponent,
    [mergedComponents],
  );

  const getRowKey = useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return record => {
      const key = record && record[rowKey];
      return key;
    };
  }, [rowKey]);

  // ====================== Render ======================
  const TableComponent = getComponent(['table'], 'table');

  // Table layout
  const mergedTableLayout = useMemo(() => {
    if (tableLayout) {
      return tableLayout;
    }
    return 'auto';
  }, [tableLayout]);

  // Header props
  const headerProps = {
    // colWidths,
    // columCount: flattenColumns.length,
    // stickyOffsets,
    // onHeaderRow,
    // fixHeader,
    // scroll,
  };

  // Empty
  const emptyNode = null;
  // Body
  const bodyTable = <Body data={mergedData} getRowKey={getRowKey} />;

  // ====================== Column ======================
  const [columns, flattenColumns] = useColumns(
    {
      ...props,
      // ...expandableConfig,
    },
    null,
  );
  const columnContext = React.useMemo(
    () => ({
      columns,
      flattenColumns,
    }),
    [columns, flattenColumns],
  );

  let groupTableNode: React.ReactNode;
  groupTableNode = (
    <div className={classNames(`${prefixCls}-content`)}>
      <TableComponent style={{ tableLayout: mergedTableLayout }}>
        {showHeader !== false && <Header {...headerProps} {...columnContext} />}
        {bodyTable}
      </TableComponent>
    </div>
  );

  let fullTable = (
    <div className={classNames(prefixCls)}>
      <MemoTableContext>
        <div className={`${prefixCls}-container`}>{groupTableNode}</div>
      </MemoTableContext>
    </div>
  );
  const TableContextValue = useMemo(
    () => ({
      prefixCls,
      getComponent,
    }),
    [prefixCls],
  );
  const BodyContextValue = useMemo(
    () => ({
      ...columnContext,
      tableLayout: mergedTableLayout,
    }),
    [mergedTableLayout, columnContext],
  );
  const ResizeContextValue = {};
  console.log(1, 'TableContext', TableContextValue);
  console.log(2, 'BodyContextValue', BodyContextValue);
  return (
    <TableContext.Provider value={TableContextValue}>
      <BodyContext.Provider value={BodyContextValue}>
        <ResizeContext.Provider value={ResizeContextValue}>{fullTable}</ResizeContext.Provider>
      </BodyContext.Provider>
    </TableContext.Provider>
  );
}

Table.defaultProps = {
  rowKey: 'key',
  prefixCls: 'rc-table',
  emptyText: () => 'No Data',
};

export default Table;
