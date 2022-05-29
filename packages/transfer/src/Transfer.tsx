
import React from 'react'

import classnames from 'classnames';

export type sizeType = 'large' | 'middle' | 'small';
export interface TransferProps {
	maxLength?: number;
	size?: sizeType;
	value?: string;
	type?: React.HTMLInputTypeAttribute
	onChange?: () => void;
	defaultValue?: string;
	bordered?: string;
	className?: string;
	prefixCls?: string;
}


export const Transfer: React.FC<TransferProps> = (props) => {
	const {
		className,
		prefixCls = 'ant-btn',
		size = 'middle',
		title = 'my-transfer'
	} = props;

	const classes = classnames(className, {
		[`${prefixCls}-${size}`]: true
	});

	return <>
		<section
			className={classes}
		>
			<span>{title}</span>
		</section>
	</>
}
