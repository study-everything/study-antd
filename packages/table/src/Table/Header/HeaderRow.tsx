import * as React from 'react';
import Cell from '../Cell';
import TableContext from '../context/TableContext';

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

  return (
    <RowComponent>
      {cells.map((cell, cellIndex) => {
        const { column } = cell;

        let additionalProps: React.HTMLAttributes<HTMLElement>;
        if (column && column.onHeaderCell) {
          additionalProps = cell.column.onHeaderCell(column);
        }

        return (
          <Cell
            {...cell}
            ellipsis={column.ellipsis}
            align={column.align}
            component={CellComponent}
            prefixCls={prefixCls}
            additionalProps={additionalProps}
            // {...fixedInfo}
            rowType="header"
          />
        );
      })}
    </RowComponent>
  );
}

HeaderRow.displayName = 'HeaderRow';
export default HeaderRow;
