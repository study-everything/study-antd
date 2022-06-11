import React from 'react';
import { storiesOf } from '@storybook/react';
import {
	Basic,
	Multiple,
	TreeData,
	Checkable,
	TreeLine,
	Async,
	Placement,
	Status,
	Suffix
} from './demo';
import './style'

storiesOf('TreeSelect', module).add('Demo', () => (
	<>
		<h1>TreeSelect树选择</h1>
		<p>树型选择控件。</p>
		<h2>何时使用</h2>
		<p>类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。</p>
		<h2>代码演示</h2>
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<div style={{ marginTop: 20, marginBottom: 50, marginRight: 30, width: '40%' }}>
				<h3>basic</h3>
				<Basic />
			</div>
			<div style={{ marginTop: 20, marginBottom: 50, width: '40%' }}>
				<h3>Multiple</h3>
				<Multiple />
			</div>
			<div style={{ marginTop: 20, marginBottom: 50, marginRight: 30, width: '40%' }}>
				<h3>TreeData</h3>
				<TreeData />
			</div>
			<div style={{ marginTop: 20, marginBottom: 50, width: '40%' }}>
				<h3>Checkable</h3>
				<Checkable />
			</div>
			<div style={{ marginTop: 20, marginBottom: 50, marginRight: 30, width: '40%' }}>
				<h3>Async</h3>
				<Async />
			</div>
			<div style={{ marginTop: 20, marginBottom: 50, width: '40%' }}>
				<h3>TreeLine</h3>
				<TreeLine />
			</div>
			<div style={{ marginTop: 20, marginBottom: 50, marginRight: 30, width: '40%' }}>
				<h3>Placement</h3>
				<Placement />
			</div>
			<div style={{ marginTop: 20, marginBottom: 50, width: '40%' }}>
				<h3>Status</h3>
				<Status />
			</div>
			<div style={{ marginTop: 20, marginBottom: 50, marginRight: 30, width: '40%' }}>
				<h3>Suffix</h3>
				<Suffix />
			</div>
		</div>
	</>
))
