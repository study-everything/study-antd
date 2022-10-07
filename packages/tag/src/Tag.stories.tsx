import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag from './Tag';
import './style';

storiesOf('Tag', module).add('Demo', () => (
  <>
    <Tag color="blue">13</Tag>
    <Tag color="blue" closable>13</Tag>
  </>
));
