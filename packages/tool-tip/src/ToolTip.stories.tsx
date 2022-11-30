import React from 'react';
import { storiesOf } from '@storybook/react';
import { ToolTip }from './ToolTip';
import { Button } from 'antd';
import './style'

storiesOf('ToolTip', module).add('right', () => (	
	<>
		<div style={{margin:'100px'}}>
			<ToolTip placement="right"  fontStylecolor="white"  bgStylecolor="green" conent="prompt text">
				<Button>right</Button>
			</ToolTip>
		</div>
	</> 
))

storiesOf('ToolTip', module).add('left', () => (	
	<>
		<div style={{margin:'100px'}}>
			<ToolTip placement="left" fontStylecolor="white" bgStylecolor="red" conent="prompt text">
				<Button>left</Button>
			</ToolTip>
		</div>
	</> 
))

storiesOf('ToolTip', module).add('top', () => (	
	<>
		<div style={{margin:'100px'}}>
			<ToolTip placement="top" fontStylecolor="white"  bgStylecolor="yellow" conent="prompt text">
				<Button>top</Button>
			</ToolTip>
		</div>
	</> 
))

storiesOf('ToolTip', module).add('bottom', () => (	
	<>
		<div style={{margin:'100px'}}>
			<ToolTip placement="bottom"  fontStylecolor="white" bgStylecolor="black" conent="prompt text">
				<Button>bottom</Button>
			</ToolTip>
		</div>
	</> 
))