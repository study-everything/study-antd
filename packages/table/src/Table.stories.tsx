// import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Animation from './examples/animation';
import ChildrenIndent from './examples/childrenIndent';
import ClassName from './examples/className';
import ColspanRowspan from './examples/colspan-rowspan';
import colspanRowspanLegacy from './examples/colspan-rowspan-legacy';
import columnResize from './examples/column-resize';
import dropdown from './examples/dropdown';
import ellipsis from './examples/ellipsis';
import ellipsisCustomTooltip from './examples/ellipsis-custom-tooltip';
import expandIcon from './examples/expandIcon';
import fixedColumns from './examples/fixedColumns';
import scrollXY from './examples/scrollXY';

storiesOf('Table', module)
  .add('Demo', Animation)
  .add('ChildrenIndent', ChildrenIndent)
  .add('ClassName', ClassName)
  .add('colSpan-rowSpan', ColspanRowspan)
  .add('colspan-rowspan-legacy', colspanRowspanLegacy)
  .add('column-resize', columnResize)
  .add('dropdown', dropdown)
  .add('ellipsis', ellipsis)
  .add('ellipsis-custom-tooltip', ellipsisCustomTooltip)
  .add('expandIcon', expandIcon)
  .add('fixedColumns', fixedColumns)
  .add('scrollXY', scrollXY)
