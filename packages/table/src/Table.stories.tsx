import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CSSMotionList from 'rc-animate/lib/CSSMotionList';
import toArray from 'rc-util/lib/Children/toArray';
import classNames from 'classnames';
// import Table from 'rc-table';
import Table from './Table';
import './style';
import './style/animation.less';

type MotionBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const MotionBody: React.FC<MotionBodyProps> = ({ children, ...props }) => {
  const nodeList = toArray(children);
  const nodesRef = React.useRef<Record<React.Key, React.ReactElement>>({});

  // Better apply clean up logic to avoid OOM
  const keys: React.Key[] = [];
  nodeList.forEach(node => {
    const { key } = node;
    nodesRef.current[key] = node;
    keys.push(key);
  });

  return (
    <tbody {...props}>
      <CSSMotionList keys={keys} component={false} motionName="move">
        {({ key, className }) => {
          const node = nodesRef.current[key];
          return React.cloneElement(node, {
            className: classNames(node.props.className, className),
          });
        }}
      </CSSMotionList>
    </tbody>
  );
};

storiesOf('Table', module).add('Demo', () => {
  interface RecordType {
    a: string;
    b?: string;
    c?: string;
    key: React.Key;
  }

  const [data, setData] = useState<RecordType[]>([
    { a: '123', key: '1' },
    { a: 'cdd', b: 'edd', key: '2' },
    { a: '1333', c: 'eee', key: '3' },
  ]);

  const onDelete = (key: React.Key, e: React.MouseEvent<HTMLElement>) => {
    console.log('Delete', key);
    e.preventDefault();
    setData(data.filter(item => item.key !== key));
  };

  const onAdd = () => {
    console.log(data); // 每次都是添加后后的值
    setData([
      ...data,
      {
        a: 'new data',
        b: 'new data',
        c: 'new data',
        key: Date.now(),
      },
    ]);
  };

  const columns = [
    { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
    { id: '123', title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
    {
      title: 'title3',
      dataIndex: 'c',
      key: 'c',
      width: 200,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'd',
      render: (text: string, record: RecordType) => (
        <a onClick={e => onDelete(record.key, e)} href="#">
          Delete
        </a>
      ),
    },
  ];

  return (
    <div style={{ margin: 20 }}>
      <h2>Table row with animation</h2>
      <button type="button" onClick={onAdd}>
        添加
      </button>
      <Table
        columns={columns}
        data={data}
        // components={{
        //   body: { wrapper: MotionBody },
        // }}
      />
    </div>
  );
});
