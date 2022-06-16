import React from 'react';
import { storiesOf } from '@storybook/react';
import Demo1 from './demo/demo1';
import Demo2 from './demo/demo2';
import Demo3 from './demo/demo3';
import Demo4 from './demo/demo4';

storiesOf('Dropdown', module).add('Basic', () => <Demo1 />);

storiesOf('Dropdown', module).add('Placement', () => <Demo2 />);

storiesOf('Dropdown', module).add('Arrow', () => <Demo3 />);

storiesOf('Dropdown', module).add('Trigger', () => <Demo4 />);
