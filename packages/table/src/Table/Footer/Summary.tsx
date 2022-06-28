import * as React from 'react';
import Cell from './Cell';
import Row from './Row';

export interface SummaryProps {
  fixed?: boolean | 'top' | 'bottom';
  children?: React.ReactNode;
}

function Summary({ children }: SummaryProps) {
  return children && (children as React.ReactElement);
}

Summary.Row = Row;
Summary.Cell = Cell;

export default Summary;
