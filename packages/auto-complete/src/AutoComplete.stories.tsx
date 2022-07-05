import React, { useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { AutoComplete } from './AutoComplete';
import './style'

storiesOf('AutoComplete', module).add('demo', () => (
	<>
		{/* <AutoComplete placeholder='input' /> */}
	</>
)).add('basic', () => {
	const [value, setValue] = useState('')
	const [options, setOptions] = useState<{ value: string }[]>([]);
	const mockVal = (str: string, repeat = 1) => ({
		value: str.repeat(repeat),
	});
	const onSearch = (searchText: string) => {
		setOptions(
			!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
		);
	}
	const onChange = (event: string) => {
		setValue(event?.target.value)
		onSearch(event.target.value)
	}
	const onSelect = (data: string) => {
		console.log('onSelect', data);
	};
	console.log(options, 'options');

	return (
		<AutoComplete placeholder='input' onChange={onChange} value={value} onSelect={onSelect} onSearch={onSearch} options={options} />
	)
}).add('status', () => {
	const [value, setValue] = useState('')
	const [options, setOptions] = useState<{ value: string }[]>([]);
	const mockVal = (str: string, repeat = 1) => ({
		value: str.repeat(repeat),
	});
	const onSearch = (searchText: string) => {
		setOptions(
			!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
		);
	}
	const onChange = (event: string) => {
		setValue(event?.target.value)
		onSearch(event.target.value)
	}
	const onSelect = (data: string) => {
		console.log('onSelect', data);
	};
	console.log(options, 'options');

	return (
		<>
			<AutoComplete placeholder='input' status='error' onChange={onChange} value={value} onSelect={onSelect} onSearch={onSearch} options={options} />
			<AutoComplete placeholder='input' status='warning' onChange={onChange} value={value} onSelect={onSelect} onSearch={onSearch} options={options} />
		</>

	)
}).add('filterOption', () => {
	const optionl = [
		{ value: 'Burns Bay Road' },
		{ value: 'Downing Street' },
		{ value: 'Wall Street' },
	];
	const [value, setValue] = useState('')
	const [options, setOptions] = useState<{ value: string }[]>([]);
	const filterOption = (inputValue, option) => {
		const newData = option.filter(item => (item.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1))
		// console.log(newData, 'newData');
		setOptions(newData)
	}
	const onChange = (event: string) => {
		setValue(event?.target.value)
		// onSearch(event.target.value)
		if (event.target.value.length > 0) {
			filterOption(event.target.value, options)
		} else {
			setOptions(optionl)
		}
	}
	const onSelect = (data: string) => {
		console.log('onSelect', data);
	};

	const onfocus = () => {
		setOptions(optionl)
	}
	const onBlur = () => {
		setOptions([])
	}
	return (
		<AutoComplete placeholder='input a or A'
			onChange={onChange}
			value={value}
			onSelect={onSelect}
			options={options}
			filterOption={filterOption}
			onFocus={onfocus}
			onBlur={onBlur}
		/>
	)

})