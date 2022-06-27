import * as React from 'react';
import Cell from '../Cell';
import TableContext from '../context/TableContext';
import { getColumnsKey } from '../utils/valueUtil';
import { getCellFixedInfo } from '../utils/fixUtil';

function HeaderRow({
  cells,
  stickyOffsets,
  flattenColumns,
  rowComponent: RowComponent,
  cellComponent: CellComponent,
  onHeaderRow,
  index,
}) {
  const { prefixCls } = React.useContext(TableContext);

  // 获取所有的key 按照索引排序
  const columnsKey = getColumnsKey(cells.map(cell => cell.column));

  return (
    <RowComponent>
      {cells.map((cell, cellIndex) => {
        const { column } = cell;
        
        const fixedInfo = getCellFixedInfo(
          cell.colStart,
          cell.colEnd,
          flattenColumns,
          stickyOffsets,
        );

        let additionalProps: React.HTMLAttributes<HTMLElement>;
        if (column && column.onHeaderCell) {
          additionalProps = cell.column.onHeaderCell(column);
        }

        return (
          <Cell
            key={columnsKey[cellIndex]}
            {...cell}
            ellipsis={column.ellipsis}
            align={column.align}
            component={CellComponent}
            prefixCls={prefixCls}
            additionalProps={additionalProps}
            {...fixedInfo}
            rowType="header"
          />
        );
      })}
    </RowComponent>
  );
}

HeaderRow.displayName = 'HeaderRow';
export default HeaderRow;
