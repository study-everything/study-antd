import React from 'react';
import { storiesOf } from '@storybook/react';
import { Skeleton } from './Skeleton';
import './style'

storiesOf('Skeleton', module).add('simple', () => (	
	<>
		<Skeleton />
	</> 
))

storiesOf('Skeleton', module).add('with-avatar', () => (	
	<>
		<Skeleton avatar paragraph={{ rows: 4 }} />
	</> 
)).add('active', () => (	
	<>
		<Skeleton avatar active paragraph={{ rows: 4 }} />
	</> 
))
