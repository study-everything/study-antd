import * as React from 'react';
import BodyContext from '../context/BodyContext';
import TableContext from '../context/TableContext';
import { getColumnsKey } from '../utils/valueUtil';
import type { GetRowKey, Key, GetComponentProps } from '../interface';
import useFlattenRecords from '../hooks/useFlattenRecords';
import BodyRow from './BodyRow';
import ResizeContext from '../context/ResizeContext';
import MeasureRow from './MeasureRow';

export interface BodyProps<RecordType> {
  data: readonly RecordType[];
  getRowKey: GetRowKey<RecordType>;
  measureColumnWidth: boolean;
  expandedKeys: Set<Key>;
  onRow: GetComponentProps<RecordType>;
  rowExpandable: (record: RecordType) => boolean;
  emptyNode: React.ReactNode;
  childrenColumnName: string;
}

function Body<RecordType>({
  data,
  getRowKey,
  measureColumnWidth,
  expandedKeys,
  onRow,
  rowExpandable,
  emptyNode,
  childrenColumnName,
}: BodyProps<RecordType>) {
  const { onColumnResize } = React.useContext(ResizeContext);
  const { prefixCls, getComponent } = React.useContext(TableContext);
  const { flattenColumns } = React.useContext(BodyContext);
  // console.log('flattenColumns', flattenColumns);

  const flattenData = useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey);

  // ====================== Render ======================
  const bodyNode = React.useMemo(() => {
    const WrapperComponent = getComponent(['body', 'wrapper'], 'tbody');
    const trComponent = getComponent(['body', 'row'], 'tr');
    const tdComponent = getComponent(['body', 'cell'], 'td');

    let rows: React.ReactNode;
    if (data.length) {
      rows = flattenData.map((item, idx) => {
        const { record, indent, index: renderIndex } = item;

        const key = getRowKey(record, idx);
        return (
          <BodyRow
            key={key}
            rowKey={key}
            record={record}
            recordKey={key}
            index={idx}
            renderIndex={renderIndex}
            rowComponent={trComponent}
            cellComponent={tdComponent}
            expandedKeys={expandedKeys}
            onRow={onRow}
            getRowKey={getRowKey}
            rowExpandable={rowExpandable}
            childrenColumnName={childrenColumnName}
            indent={indent}
          />
        );
      });
    } else {
      rows = emptyNode;
    }

    const columnsKey = getColumnsKey(flattenColumns);
    
    return (
      <WrapperComponent className={`${prefixCls}-tbody`}>
        {measureColumnWidth && (
          <MeasureRow
            prefixCls={prefixCls}
            columnsKey={columnsKey}
            onColumnResize={onColumnResize}
          />
        )}
        {rows}
      </WrapperComponent>
    );
  }, [data, prefixCls, flattenData, onColumnResize]);

  return bodyNode;
}

export default Body;
