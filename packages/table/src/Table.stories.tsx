import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Animation from './examples/animation';
import ChildrenIndent from './examples/childrenIndent';
import ClassName from './examples/className';

storiesOf('Table', module)
  .add('Demo', Animation)
  .add('ChildrenIndent', ChildrenIndent)
  .add('ClassName', ClassName);
