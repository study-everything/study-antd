import React from 'react';
import { storiesOf } from '@storybook/react';
import { Notification } from './Notification';
import './style'

storiesOf('Notification', module).add('Demo', () => (	
	<>
		<Notification />
	</> 
))