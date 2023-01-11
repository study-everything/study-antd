import React, { Fragment, useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import Menu, { Item as MenuItem, SubMenu } from './rc-menu';
import './rc-menu/assets/index.less';

storiesOf('Menu', module)
  .add('selectedKeys', () => {
    const [selectedKeys, setSelectKeys] = useState([]);
    const onSelect = info => {
      console.log('onSelect', info);
      setSelectKeys(info.selectedKeys);
    };

    const onDeselect = info => {
      console.log('onDeselect', info);
      setSelectKeys(info.selectedKeys);
    };

    const getMenu = () => (
      <Menu
        multiple={false}
        onSelect={onSelect}
        onDeselect={onDeselect}
        selectedKeys={selectedKeys}
      >
        <MenuItem key="3">item3</MenuItem>
        <MenuItem key="2">item2</MenuItem>
        <MenuItem key="1">item1</MenuItem>
      </Menu>
    );

    const allSelectedKeys = ['1', '2', '3'];

    return (
      <>
        {allSelectedKeys.map(k => (
          <label key={k}>
            {k}
            <input
              value={k}
              type="checkbox"
              checked={selectedKeys.indexOf(k) !== -1}
              onChange={e => {
                const { value } = e.target;
                if (e.target.checked) {
                  setSelectKeys(selectedKeys.concat(value));
                } else {
                  const newSelectedKeys = selectedKeys.concat();
                  const index = newSelectedKeys.indexOf(value);
                  newSelectedKeys.splice(index, 1);
                  setSelectKeys(newSelectedKeys);
                }
              }}
            />
          </label>
        ))}
        {getMenu()}
      </>
    );
  })
  .add('SubMenu', () => {
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const allSelectedKeys = ['1-1', '1-2', '2-1', '2-2', '3'];
    const allOpenKeys = ['1', '2'];

    const onSelect = e => {
      console.log('onSelect', e);
    };
    const onDeselect = e => {
      console.log('onDeselect', e);
    };
    const onOpenChange = e => {
      console.log('onOpenChange', e);
    };

    const onCheck = e => {
      const { value } = e.target;
      if (e.target.checked) {
        setSelectedKeys(selectedKeys.concat(value));
      } else {
        const newSelectedKeys = selectedKeys.concat();
        const index = newSelectedKeys.indexOf(value);
        if (value !== -1) {
          newSelectedKeys.splice(index, 1);
        }
        setSelectedKeys(newSelectedKeys);
      }
    };
    const onOpenCheck = e => {
      const { value } = e.target;
      if (e.target.checked) {
        setOpenKeys(openKeys.concat(value));
      } else {
        const newOpenKeys = openKeys.concat();
        const index = newOpenKeys.indexOf(value);
        if (value !== -1) {
          newOpenKeys.splice(index, 1);
        }
        setOpenKeys(newOpenKeys);
      }
    };

    return (
      <div>
        <h2>multiple selectable menu</h2>

        <p>
          selectedKeys: &nbsp;&nbsp;&nbsp;
          {allSelectedKeys.map(k => (
            <label key={k}>
              {k}
              <input
                value={k}
                key={k}
                type="checkbox"
                onChange={onCheck}
                checked={selectedKeys.indexOf(k) !== -1}
              />
            </label>
          ))}
        </p>

        <p>
          openKeys: &nbsp;&nbsp;&nbsp;
          {allOpenKeys.map(k => (
            <label key={k}>
              {k}
              <input
                value={k}
                type="checkbox"
                onChange={onOpenCheck}
                checked={openKeys.indexOf(k) !== -1}
              />
            </label>
          ))}
        </p>

        <div style={{ width: 400 }}>
          <Menu
            multiple
            onSelect={onSelect}
            onDeselect={onDeselect}
            onOpenChange={onOpenChange}
            // openKeys={openKeys}
            // selectedKeys={selectedKeys}
            mode="inline"
          >
            <SubMenu key="1" title="submenu1">
              <MenuItem key="1-1">item1-1</MenuItem>
              <MenuItem key="1-2">item1-2</MenuItem>
            </SubMenu>
            <SubMenu key="2" title="submenu2">
              <MenuItem key="2-1">item2-1</MenuItem>
              <MenuItem key="2-2">item2-2</MenuItem>
            </SubMenu>
            <MenuItem key="3">item3</MenuItem>
          </Menu>
        </div>
      </div>
    );
  });
