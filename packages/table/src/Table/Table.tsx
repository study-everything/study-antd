import * as React from 'react';
import isVisible from 'rc-util/lib/Dom/isVisible';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { getTargetScrollBarSize } from 'rc-util/lib/getScrollBarSize';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import Body from './Body';
import ColGroup from './ColGroup';
import Panel from './Panel';
import Footer, { FooterComponents } from './Footer';
import Summary from './Footer/Summary';
import useStickyOffsets from './hooks/useStickyOffsets';
import { getExpandableProps } from './utils/legacyUtil';
import { findAllChildrenKeys, renderExpandIcon } from './utils/expandUtil';
import ResizeContext from './context/ResizeContext';
import { getPathValue, mergeObject, validateValue, getColumnsKey } from './utils/valueUtil';
import Header from './Header/Header';
import FixedHolder from './FixedHolder';
import { getCellFixedInfo } from './utils/fixUtil';
import useSticky from './hooks/useSticky';
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
import { useLayoutState, useTimeoutLock } from './hooks/useFrame';
import ExpandedRowContext from './context/ExpandedRowContext';
import StickyContext from './context/StickyContext';

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
  console.log(9999, 'start');

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
  const [componentWidth, setComponentWidth] = React.useState(0);
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

  // 为了更新滚动条
  const fullTableRef = React.useRef<HTMLDivElement>();
  const scrollHeaderRef = React.useRef<HTMLDivElement>();
  const scrollBodyRef = React.useRef<HTMLDivElement>();
  const scrollSummaryRef = React.useRef<HTMLDivElement>();
  const [pingedLeft, setPingedLeft] = React.useState(false); // 是否在容器范围内
  const [pingedRight, setPingedRight] = React.useState(false); // 是否在容器范围内
  const [colsWidths, updateColsWidths] = useLayoutState(new Map<React.Key, number>());

  // Convert map to number width
  const colsKeys = getColumnsKey(flattenColumns);
  const pureColWidths = colsKeys.map(columnKey => colsWidths.get(columnKey));
  const colWidths = React.useMemo(() => pureColWidths, [pureColWidths.join('_')]);
  const stickyOffsets = useStickyOffsets(colWidths, flattenColumns.length);
  const fixHeader = validateValue(scroll?.y); // 是否支持纵向滚动条
  const horizonScroll = validateValue(scroll?.x);
  const fixColumn = horizonScroll && flattenColumns.some(({ fixed }) => fixed);

  // Sticky
  /**
   * isSticky 是否粘性布局
   */
  const { isSticky, offsetHeader, offsetSummary, offsetScroll, stickyClassName, container } =
    useSticky(sticky, prefixCls);

  // footer
  const summaryNode = summary?.(mergedData);
  console.log(123, summaryNode);
  
  //
  const fixFooter =
    (fixHeader || isSticky) &&
    React.isValidElement(summaryNode) &&
    summaryNode.type === Summary &&
    summaryNode.props.fixed;

  // Scroll
  let scrollXStyle: React.CSSProperties;
  let scrollYStyle: React.CSSProperties;
  let scrollTableStyle: React.CSSProperties;

  if (fixHeader) {
    scrollYStyle = {
      overflowY: 'scroll',
      maxHeight: scroll.y,
    };
  }

  if (horizonScroll) {
    scrollXStyle = { overflow: 'auto' };

    if (!fixHeader) {
      scrollYStyle = { overflowY: 'hidden' };
    }

    scrollTableStyle = {
      width: scroll.x === true ? 'auto' : scroll?.x,
      minWidth: '100%',
    };
  }

  const onColumnResize = React.useCallback((columnKey: React.Key, width: number) => {
    if (isVisible(fullTableRef.current)) {
      updateColsWidths(widths => {
        if (widths.get(columnKey) !== width) {
          const newWidths = new Map(widths);
          newWidths.set(columnKey, width);
          return newWidths;
        }
        return widths;
      });
    }
  }, []);

  const [setScrollTarget, getScrollTarget] = useTimeoutLock(null);

  function forceScroll(scrollLeft: number, target: HTMLDivElement | ((left: number) => void)) {
    if (!target) return;
    if (typeof target === 'function') {
      target(scrollLeft);
    } else if (target.scrollLeft !== scrollLeft) {
      // eslint-disable-next-line no-param-reassign
      target.scrollLeft = scrollLeft;
    }
  }

  const onScroll = ({
    currentTarget,
    scrollLeft,
  }: {
    currentTarget: HTMLElement;
    scrollLeft?: number;
  }) => {
    const mergedScrollLeft = typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft;
    const compareTarget = currentTarget || EMPTY_SCROLL_TARGET;

    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      setScrollTarget(compareTarget);

      // 更新滚动条
      forceScroll(mergedScrollLeft, scrollHeaderRef.current);
      forceScroll(mergedScrollLeft, scrollBodyRef.current);
      forceScroll(mergedScrollLeft, scrollSummaryRef.current);
      // forceScroll(mergedScrollLeft, scrollHeaderRef.current);
    }

    if (currentTarget) {
      const { scrollWidth, clientWidth } = currentTarget;
      if (scrollWidth === clientWidth) {
        return;
      }

      // 这里先不考虑从右往左
      setPingedLeft(mergedScrollLeft > 0);
      setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
    }
  };

  const triggerOnScroll = () => {
    if (horizonScroll && scrollBodyRef.current) {
      onScroll({ currentTarget: scrollBodyRef.current });
    }
  };

  const onFullTableResize = ({ width }) => {
    if (width !== componentWidth) {
      triggerOnScroll();
      setComponentWidth(fullTableRef.current ? fullTableRef.current.offsetWidth : width);
    }
  };

  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) {
      triggerOnScroll();
    }
  }, [horizonScroll, data, columns.length]);
  React.useEffect(() => {
    mounted.current = true;
  }, []);

  // ===================== Effects ======================
  const [scrollbarSize, setScrollbarSize] = React.useState(0);
  const [supportSticky, setSupportSticky] = React.useState(true);

  React.useEffect(() => {
    setScrollbarSize(getTargetScrollBarSize(scrollBodyRef.current).width);
  }, []);

  // ================== INTERNAL HOOKS ==================

  // ====================== Render ======================
  const TableComponent = getComponent(['table'], 'table');

  // Table layout
  const mergedTableLayout = React.useMemo(() => {
    if (tableLayout) {
      return tableLayout;
    }
    if (flattenColumns.some(({ ellipsis }) => ellipsis)) {
      return 'fixed';
    }
    return 'auto';
  }, [tableLayout]);

  // Header props
  const headerProps = {
    colWidths,
    columnCount: flattenColumns.length,
    stickyOffsets,
    onHeaderRow,
    fixHeader,
    scroll,
  };

  // Empty
  const emptyNode = React.useMemo(() => {
    if (hasData) {
      return null;
    }

    if (typeof emptyText === 'function') {
      return emptyText();
    }

    return emptyText;
  }, [hasData, emptyText]);

  // Body
  const bodyTable = (
    <Body
      data={mergedData}
      measureColumnWidth={fixHeader || horizonScroll}
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

  if (fixHeader || isSticky) {
    const bodyContent: React.ReactNode = (
      <div
        style={{
          ...scrollXStyle,
          ...scrollYStyle,
        }}
        onScroll={onScroll}
        ref={scrollBodyRef}
        className={classNames(`${prefixCls}-body`)}
      >
        <TableComponent
          style={{
            ...scrollTableStyle,
            tableLayout: mergedTableLayout,
          }}
        >
          {bodyColGroup}
          {bodyTable}
          {!fixFooter && summaryNode && (
            <Footer stickyOffsets={stickyOffsets} flattenColumns={flattenColumns}>
              {summaryNode}
            </Footer>
          )}
        </TableComponent>
      </div>
    );

    const fixedHolderProps = {
      noData: !mergedData.length,
      ...headerProps,
      ...columnContext,
      stickyClassName,
      onScroll,
    };

    groupTableNode = (
      <>
        {showHeader !== false && (
          <FixedHolder
            {...fixedHolderProps}
            stickyTopOffset={offsetHeader}
            className={`${prefixCls}-header`}
            ref={scrollHeaderRef}
          >
            {fixedHolderPassProps => (
              <>
                <Header {...fixedHolderPassProps} />
                {fixFooter === 'top' && <Footer {...fixedHolderPassProps}>{summaryNode}</Footer>}
              </>
            )}
          </FixedHolder>
        )}

        {/* Body Table */}
        {bodyContent}

        {/* Summary Table */}
        {fixFooter && fixFooter !== 'top' && (
          <FixedHolder
            {...fixedHolderProps}
            stickyTopOffset={offsetHeader}
            className={`${prefixCls}-summary`}
            ref={scrollSummaryRef}
          >
            {fixedHolderPassProps => <Footer {...fixedHolderPassProps}>{summaryNode}</Footer>}
          </FixedHolder>
        )}
      </>
    );
  } else {
    groupTableNode = (
      <div
        style={{
          ...scrollXStyle,
          ...scrollYStyle,
        }}
        className={classNames(`${prefixCls}-content`)}
        onScroll={onScroll}
        ref={scrollBodyRef}
      >
        <TableComponent style={{ ...scrollTableStyle, tableLayout: mergedTableLayout }}>
          {bodyColGroup}
          {showHeader !== false && <Header {...headerProps} {...columnContext} />}
          {bodyTable}
          {summaryNode && (
            <Footer stickyOffsets={stickyOffsets} flattenColumns={flattenColumns}>
              {summaryNode}
            </Footer>
          )}
        </TableComponent>
      </div>
    );
  }

  let fullTable = (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-ping-left`]: pingedLeft, // 左侧阴影
        [`${prefixCls}-ping-right`]: pingedRight,
      })}
      style={style}
      ref={fullTableRef}
    >
      <MemoTableContent>
        {title && <Panel className={`${prefixCls}-title`}>{title(mergedData)}</Panel>}
        <div className={`${prefixCls}-container`}>{groupTableNode}</div>
        {footer && <Panel className={`${prefixCls}-footer`}>{footer(mergedData)}</Panel>}
      </MemoTableContent>
    </div>
  );
  if (horizonScroll) {
    fullTable = <ResizeObserver onResize={onFullTableResize}>{fullTable}</ResizeObserver>;
  }

  const TableContextValue = React.useMemo(
    () => ({
      prefixCls,
      getComponent,
      scrollbarSize,
      direction,
      fixedInfoList: flattenColumns.map((_, colIndex) =>
        getCellFixedInfo(colIndex, colIndex, flattenColumns, stickyOffsets),
      ),
      isSticky,
    }),
    [prefixCls, getComponent, scrollbarSize, flattenColumns, stickyOffsets, direction, isSticky],
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

  const ExpandedRowContextValue = React.useMemo(
    () => ({
      componentWidth,
      fixHeader,
      fixColumn,
      horizonScroll,
    }),
    [componentWidth, fixHeader, fixColumn, horizonScroll],
  );

  const ResizeContextValue = React.useMemo(() => ({ onColumnResize }), [onColumnResize]);

  return (
    <StickyContext.Provider value={supportSticky}>
      <TableContext.Provider value={TableContextValue}>
        <BodyContext.Provider value={BodyContextValue}>
          <ExpandedRowContext.Provider value={ExpandedRowContextValue}>
            <ResizeContext.Provider value={ResizeContextValue}>{fullTable}</ResizeContext.Provider>
          </ExpandedRowContext.Provider>
        </BodyContext.Provider>
      </TableContext.Provider>
    </StickyContext.Provider>
  );
}

Table.Summary = FooterComponents;

Table.defaultProps = {
  rowKey: 'key',
  prefixCls: 'rc-table',
  emptyText: () => 'No Data',
};

export default Table;
