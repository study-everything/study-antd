import * as React from 'react';
import Cell from '../Cell';
import BodyContext from '../context/BodyContext';
import TableContext from '../context/TableContext';
import { getColumnsKey } from '../utils/valueUtil';

function BodyRow(props) {
  const {
    className,
    style,
    record,
    index,
    renderIndex,
    rowKey,
    rowExpandable,
    expandedKeys,
    onRow,
    indent = 0,
    rowComponent: RowComponent,
    cellComponent,
    childrenColumnName,
  } = props;
  const { prefixCls } = React.useContext(TableContext);
  const { flattenColumns } = React.useContext(BodyContext);

  const columnsKey = getColumnsKey(flattenColumns); // ['a','b','c','d']

  const baseRowNode = (
    <RowComponent>
      {flattenColumns.map((column, colIndex) => {
        const { render, dataIndex, className: columnClassName } = column;
        const key = columnsKey[colIndex];
        return (
          <Cell
            className={columnClassName}
            // ellipsis={column.ellipsis}
            prefixCls={prefixCls}
            key={key}
            record={record}
            index={index}
            renderIndex={renderIndex}
            dataIndex={dataIndex}
            render={render}
            component={cellComponent}
          />
        );
      })}
    </RowComponent>
  );

  return baseRowNode;
}

BodyRow.displayName = 'BodyRow';

export default BodyRow;
