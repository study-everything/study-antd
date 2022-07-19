import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tree }from './Tree';
import './style'

storiesOf('Tree', module).add('Demo', () => (	
	<>
		<Tree />
	</> 
))