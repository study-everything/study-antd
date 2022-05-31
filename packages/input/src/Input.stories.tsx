import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';
import './style'

storiesOf('Input', module).add('size', () => (
	<>
		<p>
			<span>small:</span>
			<Input size='small' />
		</p>
		<p>
			<span>middle:</span>
			<Input size='middle' />
		</p>
		<p>
			<span>large:</span>
			<Input size='large' />
		</p>
	</>
))
