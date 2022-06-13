import * as React from 'react';
import classNames from 'classnames';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import Body from './Body';
import ColGroup from './ColGroup';
import { getExpandableProps } from './utils/legacyUtil';
import { findAllChildrenKeys, renderExpandIcon } from './utils/expandUtil';
import ResizeContext from './context/ResizeContext';
import { getPathValue, mergeObject } from './utils/valueUtil';
import Header from './Header/Header';
import type {
  GetRowKey,
  ColumnsType,
  TableComponents,
  Key,
  DefaultRecordType,
  TriggerEventHandler,
  GetComponentProps,
  ExpandableConfig,
  LegacyExpandableProps,
  GetComponent,
  PanelRender,
  TableLayout,
  ExpandableType,
  RowClassName,
  CustomizeComponent,
  ColumnType,
  CustomizeScrollBody,
  TableSticky,
} from './interface';
import useColumns from './hooks/useColumns';
import ExpandedRowContext from './context/ExpandedRowContext';

// Used for conditions cache
const EMPTY_DATA = [];

const EMPTY_SCROLL_TARGET = {};

export const INTERNAL_HOOKS = 'rc-table-internal-hook';

interface MemoTableContentProps {
  children: React.ReactNode;
  pingLeft: boolean;
  pingRight: boolean;
  props: any;
}

const MemoTableContent = React.memo<MemoTableContentProps>(
  ({ children }) => children as React.ReactElement,
);
export interface TableProps<RecordType = unknown>
  extends Omit<LegacyExpandableProps<RecordType>, 'showExpandColumn'> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  data?: readonly RecordType[];
  columns?: ColumnsType<RecordType>[];
  rowKey?: string | GetRowKey<RecordType>;
  tableLayout?: TableLayout;

  // Fixed Columns
  scroll?: { x?: number | true | string; y?: number | string };

  // Expandable
  /** Config expand rows */
  expandable?: ExpandableConfig<RecordType>;
  indentSize?: number;
  rowClassName?: string | RowClassName<RecordType>;

  // Additional Part
  title?: PanelRender<RecordType>;
  footer?: PanelRender<RecordType>;
  summary?: (data: readonly RecordType[]) => React.ReactNode;

  // Customize
  id?: string;
  showHeader?: boolean;
  components?: TableComponents<RecordType>;
  onRow?: GetComponentProps<RecordType>;
  onHeaderRow?: GetComponentProps<readonly ColumnType<RecordType>[]>;
  emptyText?: React.ReactNode | (() => React.ReactNode);

  direction?: 'ltr' | 'rtl';

  internalHooks?: string;
  transformColumns?: (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>;
  internalRefs?: {
    body: React.MutableRefObject<HTMLDivElement>;
  };

  sticky?: boolean | TableSticky;
}
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

    // Additional Part
    title,
    footer,
    summary,

    // Customize
    id,
    showHeader,
    components,
    emptyText,
    onRow,
    onHeaderRow,

    // Internal
    internalHooks,
    transformColumns,
    internalRefs,

    sticky,
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

  // 获取key
  const getRowKey = React.useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return record => {
      const key = record && record[rowKey];
      return key;
    };
  }, [rowKey]);

  // ====================== Expand ======================
  const expandableConfig = getExpandableProps(props);
  const {
    expandIcon,
    expandedRowKeys,
    defaultExpandedRowKeys,
    defaultExpandAllRows,
    expandedRowRender,
    onExpand,
    onExpandedRowsChange,
    expandRowByClick,
    rowExpandable,
    expandIconColumnIndex,
    expandedRowClassName,
    childrenColumnName,
    indentSize,
  } = expandableConfig;

  const mergedExpandIcon = expandIcon || renderExpandIcon;
  const mergedChildrenColumnName = childrenColumnName || 'children';

  const expandableType = React.useMemo<ExpandableType>(() => {
    if (expandedRowRender) {
      return 'row';
    }
    
    if (
      mergedData.some(
        record => record && typeof record === 'object' && record[mergedChildrenColumnName],
      )
    ) {
      return 'nest';
    }
    return false;
  }, [!!expandedRowRender, mergedData]);

  const [innerExpandedKeys, setInnerExpandedKeys] = React.useState(() => {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys;
    }
    if (defaultExpandAllRows) {
      return findAllChildrenKeys(mergedData, getRowKey, mergedChildrenColumnName);
    }
    return [];
  });

  const mergedExpandedKeys = React.useMemo(
    () => new Set(expandedRowKeys || innerExpandedKeys || []),
    [expandedRowKeys, innerExpandedKeys],
  );

  const onTriggerExpand = React.useCallback(
    (record: RecordType) => {
      const key = getRowKey(record, mergedData.indexOf(record));

      let newExpandedKeys: Key[];
      const hasKey = mergedExpandedKeys.has(key);
      if (hasKey) {
        mergedExpandedKeys.delete(key);
        newExpandedKeys = [...mergedExpandedKeys];
      } else {
        newExpandedKeys = [...mergedExpandedKeys, key];
      }

      setInnerExpandedKeys(newExpandedKeys); // 设置展开的数组
      if (onExpand) {
        onExpand(!hasKey, record);
      }
      if (onExpandedRowsChange) {
        onExpandedRowsChange(newExpandedKeys);
      }
    },
    [getRowKey, mergedExpandedKeys, mergedData, onExpand, onExpandedRowsChange],
  );

  // ====================== Column ======================
  const [columns, flattenColumns] = useColumns(
    {
      ...props,
      ...expandableConfig,
      expandable: !!expandedRowRender,
      expandedKeys: mergedExpandedKeys,
      getRowKey,

      onTriggerExpand,
      expandIcon: mergedExpandIcon,
      expandIconColumnIndex,
      direction,
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

  // ====================== Scroll ======================

  // ===================== Effects ======================

  // ================== INTERNAL HOOKS ==================

  // ====================== Render ======================
  const TableComponent = getComponent(['table'], 'table');

  // Table layout
  const mergedTableLayout = React.useMemo(() => {
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
  const bodyTable = (
    <Body
      data={mergedData}
      expandedKeys={mergedExpandedKeys}
      rowExpandable={rowExpandable}
      getRowKey={getRowKey}
      onRow={onRow}
      emptyNode={emptyNode}
      childrenColumnName={mergedChildrenColumnName}
    />
  );

  const bodyColGroup = (
    <ColGroup colWidth={flattenColumns.map(column => column.width)} columns={flattenColumns} />
  );

  let groupTableNode: React.ReactNode;
  groupTableNode = (
    <div className={classNames(`${prefixCls}-content`)}>
      <TableComponent style={{ tableLayout: mergedTableLayout }}>
        {bodyColGroup}
        {showHeader !== false && <Header {...headerProps} {...columnContext} />}
        {bodyTable}
      </TableComponent>
    </div>
  );

  let fullTable = (
    <div className={classNames(prefixCls)}>
      <MemoTableContent>
        <div className={`${prefixCls}-container`}>{groupTableNode}</div>
      </MemoTableContent>
    </div>
  );

  const TableContextValue = React.useMemo(
    () => ({
      prefixCls,
      getComponent,
    }),
    [prefixCls],
  );

  const BodyContextValue = React.useMemo(
    () => ({
      ...columnContext,
      tableLayout: mergedTableLayout,
      expandIcon: mergedExpandIcon,
      expandableType,
      onTriggerExpand,
      indentSize,
      expandedRowRender,
    }),
    [
      mergedTableLayout,
      columnContext,
      expandableType,
      onTriggerExpand,
      mergedExpandIcon,
      indentSize,
      expandedRowRender,
    ],
  );

  // const ExpandedRowContextValue = React.useMemo(
  //   () => ({
  //     componentWidth,
  //     fixHeader,
  //     fixColumn,
  //     horizonScroll,
  //   }),
  //   [componentWidth, fixHeader, fixColumn, horizonScroll],
  // );

  const ResizeContextValue = {};
  // console.log(1, 'TableContext', TableContextValue);
  // console.log(2, 'BodyContextValue', BodyContextValue);
  return (
    <TableContext.Provider value={TableContextValue}>
      <BodyContext.Provider value={BodyContextValue}>
        {/* <ExpandedRowContext.Provider value={ExpandedRowContextValue}> */}
        <ResizeContext.Provider value={ResizeContextValue}>{fullTable}</ResizeContext.Provider>
        {/* </ExpandedRowContext.Provider> */}
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
