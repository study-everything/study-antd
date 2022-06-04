import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';
import './style';

storiesOf('Input', module).add('Demo', () => (
  <>
    <Input />
  </>
));
