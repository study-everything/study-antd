import React from 'react';
import { storiesOf } from '@storybook/react';
import Base from './demo/base';
import Gutter from './demo/gutter';
import Offset from './demo/offset';
import Sort from './demo/sort';
import Flex from './demo/flex';
import FlexAlign from './demo/flexAlign';
import FlexOrder from './demo/flexOrder';
import FlexStretch from './demo/flexStretch';
import Responsive from './demo/responsive';
import MoreResponsive from './demo/moreResponsive';

import './style';

storiesOf('Grid', module)
	.add('基础栅格', () => (<Base />))
	.add('区块间隔', () => <Gutter />)
	.add('左右偏移', () => <Offset />)
	.add('栅格排序', () => <Sort />)
	.add('排版', () => <Flex />)
	.add('对齐', () => <FlexAlign />)
	.add('排序', () => <FlexOrder />)
	.add('Flex 填充', () => <FlexStretch />)
	.add('响应式布局', () => <Responsive />)
	.add('其他属性的响应式', () => <MoreResponsive />)