import React from 'react';
import { storiesOf } from '@storybook/react';
import { Alert }from './Alert';
import './style'

storiesOf('Alert', module).add('Demo', () => (	
	<>
		<Alert />
	</> 
))