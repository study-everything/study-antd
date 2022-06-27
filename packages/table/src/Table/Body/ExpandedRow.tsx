import * as React from 'react';
import type { CustomizeComponent } from '../interface';
import Cell from '../Cell';
import TableContext from '../context/TableContext';
import ExpandedRowContext from '../context/ExpandedRowContext';

export interface ExpandedRowProps {
  prefixCls: string;
  component: CustomizeComponent;
  cellComponent: CustomizeComponent;
  className: string;
  expanded: boolean;
  children: React.ReactNode;
  colSpan: number;
  isEmpty: boolean;
}

function ExpandedRow({
  prefixCls,
  children,
  component: Component,
  cellComponent,
  className,
  expanded,
  colSpan,
  isEmpty,
}: ExpandedRowProps) {
  // const {} = React.useContext(TableContext);
  // const {} = React.useContext(ExpandedRowContext);
  return React.useMemo(() => {
    let contentNode = children;

    // if(isEmpty ? horizon)

    return (
      <Component
        className={className}
        style={{
          display: expanded ? null : 'none',
        }}
      >
        <Cell component={cellComponent} prefixCls={prefixCls} colSpan={colSpan}>
          {contentNode}
        </Cell>
      </Component>
    );
  }, [
    children,
    Component,
    className,
    expanded,
    colSpan,
    isEmpty,
    // scrollbarSize,
    // componentWidth,
    // fixColumn,
    // fixHeader,
    // horizonScroll,
  ]);
}
export default ExpandedRow;
