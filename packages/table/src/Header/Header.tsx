import * as React from 'react';
import HeaderRow from './HeaderRow';
import TableContext from '../context/TableContext';

function parseHeaderRows(rootColumns) {
  const rows = [];

  function fillRowCells(columns, colIndex, rowIndex = 0) {
    rows[rowIndex] = rows[rowIndex] || [];
    let currentColIndex = colIndex;

    const colSpans = columns.filter(Boolean).map(column => {
      const cell = {
        key: column.key,
        className: column.className || '',
        children: column.title,
        column,
        colStart: currentColIndex,
      };
      let colSpan: number = 1;

      const subColumns = column.children;
      if (subColumns && subColumns.length > 0) {
      }
      if ('colSpan' in column) {
      }

      if ('rowSpan' in column) {
      }

      cell.colSpan = colSpan;
      cell.colEnd = cell.colStart + colSpan - 1;
      rows[rowIndex].push(cell);

      currentColIndex += colSpan;

      return colSpan;
    });
    return colSpans;
  }

  fillRowCells(rootColumns, 0);

  // Handle `rowSpan`
  const rowCount = rows.length;
  for (let i = 0; i < rowCount; i++) {
    rows[i].forEach(cell => {
      //  if()
    });
  }
  return rows;
}

function Header({ stickyOffsets, columns, flattenColumns, onHeaderRow }) {
  const { prefixCls, getComponent } = React.useContext(TableContext);

  const rows = React.useMemo(() => parseHeaderRows(columns), [columns]);
  const WrapperComponent = getComponent(['header', 'wrapper'], 'thead');
  const trComponent = getComponent(['header', 'row'], 'tr');
  const thComponent = getComponent(['header', 'cell'], 'th');

  return (
    <WrapperComponent className={`${prefixCls}-thead`}>
      {rows.map((row, rowIndex) => {
        const rowNode = (
          <HeaderRow
            key={rowIndex}
            flattenColumns={flattenColumns}
            cells={row}
            stickyOffsets={stickyOffsets}
            rowComponent={trComponent}
            cellComponent={thComponent}
            onHeaderRow={onHeaderRow}
            index={rowIndex}
          />
        );
        return rowNode;
      })}
    </WrapperComponent>
  );
}

export default Header;
