import * as React from 'react';
import Cell from '../Cell';
import type {
  CellType,
  StickyOffsets,
  ColumnType,
  CustomizeComponent,
  GetComponentProps,
} from '../interface';
import TableContext from '../context/TableContext';
import { getColumnsKey } from '../utils/valueUtil';
import { getCellFixedInfo } from '../utils/fixUtil';

export interface RowProps<RecordType> {
  cells: readonly CellType<RecordType>[];
  stickyOffsets: StickyOffsets;
  flattenColumns: readonly ColumnType<RecordType>[];
  rowComponent: CustomizeComponent;
  cellComponent: CustomizeComponent;
  onHeaderRow: GetComponentProps<readonly ColumnType<RecordType>[]>;
  index: number;
}

function HeaderRow<RecordType>({
  cells,
  stickyOffsets,
  flattenColumns,
  rowComponent: RowComponent,
  cellComponent: CellComponent,
  onHeaderRow,
  index,
}: RowProps<RecordType>) {
  const { prefixCls } = React.useContext(TableContext);

  let rowProps;
  if (onHeaderRow) {
    rowProps = onHeaderRow(
      cells.map(cell => cell.column),
      index,
    );
  }

  // 获取所有的key 按照索引排序
  const columnsKey = getColumnsKey(cells.map(cell => cell.column));

  return (
    <RowComponent {...rowProps}>
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
            {...cell}
            ellipsis={column.ellipsis}
            align={column.align}
            component={CellComponent}
            prefixCls={prefixCls}
            key={columnsKey[cellIndex]}
            {...fixedInfo}
            additionalProps={additionalProps}
            rowType="header"
          />
        );
      })}
    </RowComponent>
  );
}

HeaderRow.displayName = 'HeaderRow';
export default HeaderRow;
