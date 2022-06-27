import * as React from 'react';
import classNames from 'classnames';
import type {
  DataIndex,
  ColumnType,
  RenderedCell,
  CustomizeComponent,
  CellType,
  DefaultRecordType,
  AlignType,
  CellEllipsisType,
} from '../interface';
import { getPathValue, validateValue } from '../utils/valueUtil';
import StickyContext from '../context/StickyContext';

function isRenderCell(data) {
  return data && typeof data === 'object' && !Array.isArray(data) && !React.isValidElement(data);
}
interface InternalCellProps<RecordType extends DefaultRecordType>
  extends Pick<HoverContextProps, 'onHover'> {
  prefixCls?: string;
  className?: string;
  record?: RecordType;
  /** `column` index is the real show rowIndex */
  index?: number;
  /** the index of the record. For the render(value, record, renderIndex) */
  renderIndex?: number;
  dataIndex?: DataIndex;
  render?: ColumnType<RecordType>['render'];
  component?: CustomizeComponent;
  children?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  ellipsis?: CellEllipsisType;
  align?: AlignType;

  shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;

  // Fixed
  fixLeft?: number | false;
  fixRight?: number | false;
  firstFixLeft?: boolean;
  lastFixLeft?: boolean;
  firstFixRight?: boolean;
  lastFixRight?: boolean;

  // ====================== Private Props ======================
  /** @private Used for `expandable` with nest tree */
  appendNode?: React.ReactNode;
  additionalProps?: React.TdHTMLAttributes<HTMLTableCellElement>;
  /** @private Fixed for user use `shouldCellUpdate` which block the render */
  expanded?: boolean;

  rowType?: 'header' | 'body' | 'footer';

  isSticky?: boolean;

  hovering?: boolean;
}

function Cell<RecordType extends DefaultRecordType>(
  {
    prefixCls,
    className,
    record,
    index,
    renderIndex,
    dataIndex,
    render,
    children,
    component: Component = 'td',
    colSpan,
    rowSpan, // This is already merged on WrapperCell
    fixLeft,
    fixRight,
    firstFixLeft,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    appendNode,
    additionalProps = {},
    ellipsis,
    align,
    rowType,
    isSticky,

    // Hover
    hovering,
    onHover,
  }: InternalCellProps<RecordType>,
  ref: React.Ref<any>,
): React.ReactElement {
  const cellPrefixCls = `${prefixCls}-cell`;

  const supportSticky = React.useContext(StickyContext);

  // ==================== Child Node ====================
  const [childNode, legacyCellProps] = React.useMemo<
    [React.ReactNode, CellType<RecordType>] | [React.ReactNode]
  >(() => {
    if (validateValue(children)) {
      return [children];
    }
    // Customize render node
    const value = getPathValue<Record<string, unknown> | React.ReactNode, RecordType>(
      record,
      dataIndex,
    );

    let returnChildNode = value;
    let returnCellProps: CellType<RecordType> | undefined;

    if (render) {
      const renderData = render(value, record, renderIndex);
      // 判断返回的是否为react元素
      if (isRenderCell(renderData)) {
        returnChildNode = renderData.children;
        returnCellProps = renderData.props;
      } else {
        returnChildNode = renderData;
      }
    }

    return [returnChildNode, returnCellProps];
  }, [
    /* eslint-disable react-hooks/exhaustive-deps */
    // Always re-render if `renderWithProps`
    // perfRecord.renderWithProps ? Math.random() : 0,
    /* eslint-enable */
    children,
    dataIndex,
    // perfRecord,
    record,
    render,
    renderIndex,
  ]);

  let mergedChildNode = childNode;

  // 防止 mergedChildNode 不是正确的值
  if (
    typeof mergedChildNode === 'object' &&
    !Array.isArray(mergedChildNode) &&
    !React.isValidElement(mergedChildNode)
  ) {
    mergedChildNode = null;
  }

  if (ellipsis) {
    mergedChildNode = <span className={`${cellPrefixCls}-content`}>{mergedChildNode}</span>;
  }

  const {
    colSpan: cellColSpan,
    rowSpan: cellRowSpan,
    style: cellStyle,
    className: cellClassName,
    ...restCellProps
  } = legacyCellProps || {};
  const mergedColSpan = (cellColSpan !== undefined ? cellColSpan : colSpan) ?? 1;
  const mergedRowSpan = (cellRowSpan !== undefined ? cellRowSpan : rowSpan) ?? 1;

  if (mergedColSpan === 0 || mergedRowSpan === 0) {
    return null;
  }
  // ====================== Fixed =======================
  const fixedStyle: React.CSSProperties = {};
  const isFixLeft = typeof fixLeft === 'number' && supportSticky;
  const isFixRight = typeof fixRight === 'number' && supportSticky;

  if (isFixLeft) {
    fixedStyle.position = 'sticky';
    fixedStyle.left = fixLeft;
  }

  if (isFixRight) {
    fixedStyle.position = 'sticky';
    fixedStyle.right = fixRight;
  }
  // ====================== Align =======================

  // ====================== Hover =======================

  // ====================== Render ======================
  const title = null;
  const componentProps = {
    title,
    ...restCellProps,
    ...additionalProps,
    colSpan: mergedColSpan !== 1 ? mergedColSpan : null,
    rowSpan: mergedRowSpan !== 1 ? mergedRowSpan : null,
    className: classNames(
      cellPrefixCls,
      className,
      {
        [`${cellPrefixCls}-fix-left`]: isFixLeft && supportSticky,
        [`${cellPrefixCls}-fix-left-last`]: lastFixLeft && supportSticky,
        [`${cellPrefixCls}-fix-right`]: isFixRight && supportSticky,
        [`${cellPrefixCls}-fix-right-first`]: firstFixRight && supportSticky,
        [`${cellPrefixCls}-ellipsis`]: ellipsis,
      },
      additionalProps.className,
      cellClassName,
    ),
    style: { ...fixedStyle, ...cellStyle },
  };
  return (
    <Component {...componentProps}>
      {appendNode}
      {mergedChildNode}
    </Component>
  );
}

const RefCell = React.forwardRef(Cell);
RefCell.displayName = 'Cell';

const MemoCell = React.memo(RefCell);

const WrappedCell = React.forwardRef((props, ref) => {
  const { index, additionalProps = {}, colSpan, rowSpan } = props;
  const { colSpan: cellColSpan, rowSpan: cellRowSpan } = additionalProps;

  const mergedColSpan = colSpan ?? cellColSpan;
  const mergedRowSpan = rowSpan ?? cellRowSpan;

  return <MemoCell {...props} colSpan={mergedColSpan} rowSpan={mergedRowSpan} ref={ref} />;
});

WrappedCell.displayName = 'WrappedCell';

export default WrappedCell;
