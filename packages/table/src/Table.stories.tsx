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
import expandedRowRender from './examples/expandedRowRender';
import fixedColumns from './examples/fixedColumns';
import fixedColumnsAutoHeight from './examples/fixedColumns-auto-height';
import groupingColumns from './examples/grouping-columns';
import hideHeader from './examples/hide-header';
import jsx from './examples/jsx';
import key from './examples/key';
import nested from './examples/nested';
import scrollXY from './examples/scrollXY';
import noData from './examples/no-data';
import reactDnd from './examples/react-dnd';
import rowAndCellClick from './examples/rowAndCellClick';
import styledComponents from './examples/styled-components';
import stickyHeaderAndSummary from './examples/stickyHeaderAndSummary';
import titleAndFooter from './examples/title-and-footer';

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
  .add('expandedRowRender', expandedRowRender)
  .add('fixedColumns', fixedColumns)
  .add('fixedColumnsAutoHeight', fixedColumnsAutoHeight)
  .add('fixedColumnsAutoHeight', fixedColumnsAutoHeight)
  .add('groupingColumns', groupingColumns)
  .add('hideHeader', hideHeader)
  .add('jsx', jsx)
  .add('key', key)
  .add('nested', nested)
  .add('scrollXY', scrollXY)
  .add('noData', noData)
  .add('reactDnd', reactDnd)
  .add('rowAndCellClick', rowAndCellClick)
  .add('styledComponents', styledComponents)
  .add('stickyHeaderAndSummary', stickyHeaderAndSummary)
  .add('titleAndFooter', titleAndFooter);
