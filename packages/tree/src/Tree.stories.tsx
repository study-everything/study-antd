import React from 'react';
import { storiesOf } from '@storybook/react';
import type { DataNode, TreeProps } from '.';
import Tree from '.';
import './style';

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-1',
        children: [{ title: 'ssd', key: '0-1-0' }],
      },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Tree
      checkable
      defaultExpandedKeys={['0-0', '0-1']}
      defaultSelectedKeys={['0-1-0']}
      defaultCheckedKeys={['0-0', '0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
      draggable
    />
  );
};

storiesOf('Tree', module).add('Basic', () => <App />);
