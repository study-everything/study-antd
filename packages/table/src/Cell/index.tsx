import classNames from 'classnames';
import * as React from 'react';
import { getPathValue, validateValue } from '../utils/valueUtil';

function isRenderCell(data) {
  return data && typeof data === 'object' && !Array.isArray(data) && !React.isValidElement(data);
}

function Cell(
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
  },
  ref,
) {
  const cellPrefixCls = `${prefixCls}-cell`;

  // ==================== Child Node ====================
  const [childNode, legacyCellProps] = React.useMemo(() => {
    if (validateValue(children)) {
      return [children];
    }
    // Customize render node
    const value = getPathValue(record, dataIndex);
    let returnChildNode = value;
    let returnCellProps;

    if (render) {
      const renderData = render(value, record, renderIndex);
      // 判断返回的是否为react元素
      if (isRenderCell(renderData)) {
        // 发出警告
        returnChildNode = renderData.children;
        returnCellProps = renderData.props;
      } else {
        returnChildNode = renderData;
      }
    }

    return [returnChildNode, returnCellProps];
  }, []);

  let mergedChildNode = childNode;

  // 防止 mergedChildNode 不是正确的值
  if (
    typeof mergedChildNode === 'object' &&
    !Array.isArray(mergedChildNode) &&
    !React.isValidElement(mergedChildNode)
  ) {
    mergedChildNode = null;
  }

  const { className: cellClassName } = legacyCellProps || {};
  // ====================== Fixed =======================

  // ====================== Align =======================

  // ====================== Hover =======================

  // ====================== Render ======================
  const title = '';
  const componentProps = {
    title,
    className: classNames(cellPrefixCls, className, {}),
  };

  return <Component {...componentProps}>{mergedChildNode}</Component>;
}

const RefCell = React.forwardRef(Cell);
RefCell.displayName = 'Cell';

const MemoCell = React.memo(RefCell);

const WrappedCell = React.forwardRef((props, ref) => {
  const { index, additionalProps = {}, colSpan, rowSpan } = props;
  const { colSpan: cellColSpan, rowSpan: cellRowSpan } = additionalProps;

  return <MemoCell {...props} ref={ref} />;
});

WrappedCell.displayName = 'WrappedCell';

export default WrappedCell;
