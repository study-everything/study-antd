import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import Table from '../Table';
import 'react-resizable/css/styles.css';

const ResizableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

interface RecordType {
  a: string;
  b?: string;
  c?: string;
  d?: number;
  key: string;
}

function Demo() {
  const [columns, setColumns] = useState([
    { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
    { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
    { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'd',
      render() {
        return <a href="#">Operations</a>;
      },
    },
  ]);

  const [data] = useState([
    { a: '123', key: '1' },
    { a: 'cdd', b: 'edd', key: '2' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
  ]);

  const handleResize =
    index =>
    (e, { size }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      setColumns(nextColumns);
    };

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  return (
    <div>
      <h2>Integrate with react-resizable</h2>
      <Table
        components={components}
        columns={columns.map((col, index) => ({
          ...col,
          onHeaderCell: column =>
            ({
              width: column.width,
              onResize: handleResize(index),
            } as any),
        }))}
        data={data}
      />
    </div>
  );
}

export default Demo;
