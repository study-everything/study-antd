import React from 'react';
import { storiesOf } from '@storybook/react';
import { Popover }from './Popover';
import './style'

storiesOf('Popover', module).add('Demo', () => (	
	<>
		<Popover />
	</> 
))