import * as React from 'react';
import BodyContext from '../context/BodyContext';
import TableContext from '../context/TableContext';
import type { GetRowKey, Key, GetComponentProps } from '../interface';
import useFlattenRecords from '../hooks/useFlattenRecords';
import BodyRow from './BodyRow';

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
      // console.log('flattenData', flattenData);
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
    return <WrapperComponent className={`${prefixCls}-tbody`}>{rows}</WrapperComponent>;
  }, [data, prefixCls, flattenData]);

  return bodyNode;
}

export default Body;
