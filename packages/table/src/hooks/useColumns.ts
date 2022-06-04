import * as React from 'react';

function useColumns({ columns }, transformColumns) {
  const mergedColumns = columns;
  const flattenColumns = columns;
  return [mergedColumns, flattenColumns];
}

export default useColumns;
