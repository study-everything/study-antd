import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spin } from './Spin';
import './style';

storiesOf('Spin', module).add('Demo', () => (
  <>
    hello
    <Spin />
  </>
));
