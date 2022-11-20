import React from 'react';
import { storiesOf } from '@storybook/react';
import { Cascader } from './Cascader';
import './style'

storiesOf('Cascader', module).add('Demo', () => {
	interface Option {
		value: string | number;
		label: string;
		children?: Option[];
	}
	
	const options: Option[] = [
		{
			value: 'zhejiang',
			label: 'Zhejiang',
			children: [
				{
					value: 'hangzhou',
					label: 'Hangzhou',
					children: [
						{
							value: 'xihu',
							label: 'West Lake',
						},
					],
				},
			],
		},
		{
			value: 'jiangsu',
			label: 'Jiangsu',
			children: [
				{
					value: 'nanjing',
					label: 'Nanjing',
					children: [
						{
							value: 'zhonghuamen',
							label: 'Zhong Hua Men',
						},
					],
				},
			],
		},
	];
	
	const onChange = (value: string[]) => {
		console.log(value);
	}

	return (
		<Cascader options={options} onChange={onChange} placeholder="Please select" /> 
	)
})