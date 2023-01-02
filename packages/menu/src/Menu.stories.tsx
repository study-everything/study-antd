import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import Menu, { Item as MenuItem } from './rc-menu';
import './rc-menu/assets/index.less';

storiesOf('Menu', module).add('Demo', () => (
  <Menu>
    <MenuItem key="3">item3</MenuItem>
    <MenuItem key="2">item2</MenuItem>
    <MenuItem key="1">item1</MenuItem>
  </Menu>
));
