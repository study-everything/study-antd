import React from 'react';
import { storiesOf } from '@storybook/react';
import { InputNumber }from './InputNumber';
import './style'

storiesOf('InputNumber', module).add('Demo', () => (	
	<>
		<InputNumber defaultValue={10}/>
	</> 
))