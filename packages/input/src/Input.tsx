
import React from 'react'

import classnames from 'classnames';

export type inputSize = 'large' | 'middle' | 'small';
export interface InputProps {
	maxLength?: number;
	size?: inputSize;
	value?: string;
	type?: React.HTMLInputTypeAttribute
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	defaultValue?: string;
	bordered?: string;
	className?: string;
	prefixCls?: string;
	placeholder?: string;
}


export const Input: React.FC<InputProps> = (props) => {
	const {
		className,
		prefixCls = 'ant-input',
		size = 'middle',
		type = 'text',
		value,
		onChange,
		placeholder
	} = props;

	const classes = classnames(className, {
		[`${prefixCls}-${size}`]: true,
		'ant-input': true
	});

	return <>
		<input
			className={classes}
			placeholder={placeholder}
			type={type}
			value={value}
			onChange={onChange}
		/>
	</>
}
