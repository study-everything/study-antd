import React from 'react';
import { Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/lib/menu/style/index.css';
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
            2nd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);

export default function Demo1() {
  return (
    <Dropdown overlay={menu}>
      <a onClick={e => e.preventDefault()}>
        <span>
          Hover me
          <DownOutlined />
        </span>
      </a>
    </Dropdown>
  );
}
