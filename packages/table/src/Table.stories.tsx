import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Animation from './examples/animation';
import ChildrenIndent from './examples/childrenIndent';

storiesOf('Table', module).add('Demo', Animation);
storiesOf('Table', module).add('ChildrenIndent', ChildrenIndent);
