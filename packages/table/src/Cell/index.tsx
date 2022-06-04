import classNames from 'classnames';
import * as React from 'react';
import { validateValue } from '../utils/valueUtil';

function Cell({ prefixCls, className, children, component: Component = 'td' }, ref) {
  const cellPrefixCls = `${prefixCls}-cell`;
  // ==================== Child Node ====================
  const [childNode, legacyCellProps] = React.useMemo(() => {
    if (validateValue(children)) {
      return [children];
    }
    // Customize render node
    // let returnChildNode = value;
    // let returnCellProps: CellType<RecordType> | undefined = undefined;
    // return [returnChildNode, returnCellProps];
  }, []);

  let mergedChildNode = childNode;

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
