import React from 'react';
import { storiesOf } from '@storybook/react';
import { Menu, Button, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Dropdown from './Dropdown';
import 'antd/lib/menu/style/index.css';


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

const handleButtonClick = () => {};

storiesOf('Dropdown', module).add('Basic', () => (
  <Dropdown overlay={menu} trigger={['click']}>
    <a onClick={e => e.preventDefault()}>
      <span>
        Hover me
        <DownOutlined />
      </span>
    </a>
  </Dropdown>
));

storiesOf('Dropdown', module).add('Placement', () => (
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
));

storiesOf('Dropdown', module).add('Arrow', () => (
  <div>
    <Dropdown overlay={menu} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
      <Button>bottom</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
      <Button>bottomRight</Button>
    </Dropdown>
    <div style={{ height: 100 }} />
    <Dropdown overlay={menu} placement="topLeft" arrow={{ pointAtCenter: true }}>
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="top" arrow={{ pointAtCenter: true }}>
      <Button>top</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="topRight" arrow={{ pointAtCenter: true }}>
      <Button>topRight</Button>
    </Dropdown>
  </div>
));

storiesOf('Dropdown', module).add('Trigger', () => (
  <Dropdown trigger={['click']} overlay={menu}>
    <a onClick={e => e.preventDefault()}>
      <span>
        Click me
        <DownOutlined />
      </span>
    </a>
  </Dropdown>
));

storiesOf('Dropdown', module).add('DropdownButton', () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }} className="dropdown-btn-demo">
    <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button overlay={menu} placement="bottom" icon={<UserOutlined />}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button onClick={handleButtonClick} overlay={menu} disabled>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      overlay={menu}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="tooltip" key="leftButton">
          {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton as React.ReactElement<any, string>, { loading: true }),
      ]}
    >
      With Tooltip
    </Dropdown.Button>
    <Dropdown overlay={menu}>
      <Button>
        Button
        <DownOutlined />
      </Button>
    </Dropdown>
  </div>
));
