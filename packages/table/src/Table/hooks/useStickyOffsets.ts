import { useMemo } from 'react';
import type { StickyOffsets } from '../interface';

function useStickyOffsets(colWidths: number[], columnCount: number) {
  const stickyOffsets: StickyOffsets = useMemo(() => {
    const leftOffsets = [];
    const rightOffsets = [];
    let left = 0;
    let right = 0;

    for (let start = 0; start < columnCount; start++) {
      leftOffsets[start] = left;
      left += colWidths[start] || 0;

      const end = columnCount - start - 1;
      rightOffsets[end] = right;
      right += colWidths[end] || 0;
    }

    return {
      left: leftOffsets,
      right: rightOffsets,
    };
  }, [colWidths, columnCount]);

  return stickyOffsets;
}
export default useStickyOffsets;
