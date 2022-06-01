import React from 'react';
import { storiesOf } from '@storybook/react';
import { Message }from './Message';
import './style'

storiesOf('Message', module).add('Demo', () => (	
	<>
		<Message />
	</> 
))