import React from 'react';
import { storiesOf } from '@storybook/react';
import { Empty }from './Empty';
import './style'

storiesOf('Empty', module).add('Demo', () => (	
	<>
		<Empty />
	</> 
))