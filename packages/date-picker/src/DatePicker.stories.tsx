import React from 'react';
import { Space } from 'antd';
import { storiesOf } from '@storybook/react';
import zhCN from './locale/zh_CN';
import DatePicker from '.';
import type { DatePickerProps } from '.';
import './style'

storiesOf('DatePicker', module)
	.add('basic', () => {
		const onChange: DatePickerProps['onChange'] = (date, dateString) => {
			console.log(date, dateString);
		};

		return (
			<Space direction="vertical">
				<DatePicker onChange={onChange} locale={zhCN} />
				<DatePicker onChange={onChange} picker="week" locale={zhCN} />
				<DatePicker onChange={onChange} picker="month" locale={zhCN} />
				<DatePicker onChange={onChange} picker="quarter" locale={zhCN} />
				<DatePicker onChange={onChange} picker="year" locale={zhCN} />
			</Space>
		);
	})
	.add('time', () => {
		const onChange = (
			value: DatePickerProps['value'],
			dateString: string,
		) => {
			console.log('Selected Time: ', value);
			console.log('Formatted Selected Time: ', dateString);
		};

		const onOk = (value: DatePickerProps['value']) => {
			console.log('onOk: ', value);
		};

		return (
			<Space direction="vertical" size={12}>
				<DatePicker showTime locale={zhCN} onChange={onChange} onOk={onOk} />
			</Space>
		)
	})
