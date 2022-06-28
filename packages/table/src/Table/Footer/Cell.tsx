import * as React from 'react';
export interface SummaryCellProps {
  className?: string;
  children?: React.ReactNode;
  index: number;
  colSpan?: number;
  rowSpan?: number;
  align?: AlignType;
}

export default function SummaryCell() {
  return 'SummaryCell';
}
