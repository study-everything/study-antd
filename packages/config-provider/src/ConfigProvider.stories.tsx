import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Radio, Divider } from 'antd';
import { ConfigProvider } from './ConfigProvider';
import { Button } from './button/button'
import './style';
import type { SizeType } from './SizeContext';

storiesOf('ConfigProvider', module).add('Demo', () => {
	const [componentSize, setComponentSize] = useState<SizeType>('small');
	const [componentDisabled, setcomponentDisabled] = useState<boolean>(true);
	
	return (
		<div>
			<Radio.Group
				value={componentSize}
				onChange={e => {
					setComponentSize(e.target.value);
				}}
			>
				<Radio.Button value="small">Small</Radio.Button>
				<Radio.Button value="middle">Middle</Radio.Button>
				<Radio.Button value="large">Large</Radio.Button>
			</Radio.Group>
			<Radio.Group
				style={{ marginLeft: '10px' }}
				value={componentDisabled}
				onChange={e => {
					setcomponentDisabled(e.target.value);
				}}
			>
				<Radio.Button value>disabled</Radio.Button>
				<Radio.Button value={ false }>enabled</Radio.Button>

			</Radio.Group>
			<Divider />
			<ConfigProvider componentSize={componentSize} componentDisabled={componentDisabled}>
				<Button>Button</Button>
			</ConfigProvider>
		</div>
	)
});
