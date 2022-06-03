import React from 'react';
import { storiesOf } from '@storybook/react';
import { Skeleton }from './Skeleton';
import './style'

storiesOf('Skeleton', module).add('Demo', () => (	
	<>
		<Skeleton />
	</> 
))