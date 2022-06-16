import React from 'react';
import { Menu, Button } from 'antd';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';

import Dropdown from '../Dropdown';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item
          </a>
        ),
      },
    ]}
  />
);

export default function Demo1() {
  return (
    <div>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="bottom">
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>bottomRight</Button>
      </Dropdown>
      <div style={{ height: 100 }} />
      <Dropdown overlay={menu} placement="topLeft">
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="top" trigger={['click']}>
        <Button>top</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="topRight">
        <Button>topRight</Button>
      </Dropdown>
    </div>
  );
}
