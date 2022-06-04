import React from 'react';
import { storiesOf } from '@storybook/react';
import { Empty }from './Empty';
import './style'

storiesOf('Empty', module)
	.add('basic', () => (	
		<>
			<Empty />
		</> 
	))
	.add('simple', () => (
		<>
			<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
		</>
	))
	.add('custom', () => (
		<>
			<Empty
				image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
				imageStyle={{
				height: 60,
				}}
				description={
				<span>
					Customize <a href="#API">Description</a>
				</span>
				}
			>
				<button>Create Now</button>
			</Empty>
		</>
	))