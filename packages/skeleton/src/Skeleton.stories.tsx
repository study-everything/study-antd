import React from 'react';
import { storiesOf } from '@storybook/react';
import { Skeleton } from './Skeleton';
import './style'

storiesOf('Skeleton', module).add('simple', () => (	
	<>
		<Skeleton />
	</> 
)).add('with-avatar', () => (	
	<>
		<Skeleton avatar paragraph={{ rows: 4 }} />
	</> 
)).add('active', () => (	
	<>
		<Skeleton avatar active paragraph={{ rows: 4 }} />
	</> 
)).add('自定义DIY组合', () => (	
	<>	
		<div>按钮/头像/输入框/图像</div>
		<Skeleton.Button active={true} size={'large'} shape={'square'} block={false} />
		<Skeleton.Button active={true} size={'small'} shape={'circle'} block={false} />
		<Skeleton.Button active={true} shape={'round'} block={true} />
		<Skeleton.Avatar active={true} size={'large'} shape={'circle'} />
		<Skeleton.Avatar active={true} size={'default'} shape={'square'} />
		<Skeleton.Input active={true} size={'deafult'} block={true} />
		<Skeleton.Image />
	</> 
)).add('包含子组件',()=>(
	<>
		<Skeleton loading={false}>
			<div>
				<h4>Ant Design, a design language</h4>
				<p>loading 为true时展示骨架屏</p>
				<p>
					We supply a series of design principles, practical patterns and high quality design
					resources (Sketch and Axure), to help people create their product prototypes beautifully
					and efficiently.
				</p>
			</div>
		</Skeleton>
		<Skeleton loading={true}>
			<div>
				<h4>Ant Design, a design language</h4>
				<p>loading 为true时展示骨架屏</p>
				<p>
					We supply a series of design principles, practical patterns and high quality design
					resources (Sketch and Axure), to help people create their product prototypes beautifully
					and efficiently.
				</p>
			</div>
		</Skeleton>
	</>
))
