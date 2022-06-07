import * as React from 'react';
import BodyContext from '../context/BodyContext';
import TableContext from '../context/TableContext';
import useFlattenRecords from '../hooks/useFlattenRecords';
import BodyRow from './BodyRow';

function Body({ data, emptyNode, childrenColumnName, getRowKey }) {
  const { prefixCls, getComponent } = React.useContext(TableContext);
  const { flattenColumns } = React.useContext(BodyContext);

  const flattenData = useFlattenRecords(data, childrenColumnName);

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
            indent={indent}
          />
        );
      });
    } else {
      rows = emptyNode;
    }

    return <WrapperComponent className={`${prefixCls}-tbody`}>{rows}</WrapperComponent>;
  }, [data, prefixCls]);

  return bodyNode;
}
export default Body;
