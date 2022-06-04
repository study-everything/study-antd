import React, { useMemo } from 'react';
import classNames from 'classnames';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import ResizeContext from './context/ResizeContext';
import { getPathValue, mergeObject } from './utils/valueUtil';
import Header from './Header/Header';
import type { GetComponent, TableComponents, DefaultRecordType } from './interface';
import useColumns from './hooks/useColumns';

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
    data,
    tableLayout,

    // Customize 定制
    showHeader,
    components,
  } = props;

  //  ==================== Customize 定制 =====================
  const mergedComponents = React.useMemo(
    () => mergeObject<TableComponents<RecordType>>(components, {}),
    [components],
  );

  const getComponent = React.useCallback<GetComponent>(
    (path, defaultComponent) => getPathValue(mergedComponents, path) || defaultComponent,
    [mergedComponents],
  );

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

  // ====================== Column ======================
  const [columns, flattenColumns] = useColumns(
    {
      ...props,
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
      tableLayout: mergedTableLayout,
    }),
    [mergedTableLayout],
  );
  const ResizeContextValue = {};
  console.log(1, 'TableContext', TableContextValue);
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
