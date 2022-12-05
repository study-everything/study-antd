/* eslint-disable react/button-has-type */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Popover } from '.';
import './style';

storiesOf('Popover', module)
  .add('Hover Me', () => (
    <Popover title="Hover Me">
      <button>Hover Me</button>
    </Popover>
  ))
  .add('Click Me', () => (
    <Popover trigger="click" title="Hover Me">
      <button>Hover Me</button>
    </Popover>
  ));
