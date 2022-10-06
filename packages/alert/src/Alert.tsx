
import React, { useState } from 'react'
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';

export interface AlertProps {
	message?: React.ReactNode,
	description?: React.ReactNode,
	type?: React.ReactNode,
	showIcon?: boolean;
	closable?: boolean;
  className?: string;
  closeText?: string;
	banner?: boolean;
	prefixCls?: string
	onClose?: Function;
}


export const Alert: React.FC<AlertProps> = (props) => {
	const {
		className = '',
		type,
		message,
		description,
		closable,
		onClose
	} = props;
	

	const cls = classNames(
		'alert_basic',
		className,
		{
			'ant-alert-success': !type || type === 'success',
			'ant-alert-info': type === 'info',
			'ant-alert-warning': type === 'warning',
			'ant-alert-error': type === 'error',
		}
	)

	const clsError = classNames(
		'alert_basic',
		'ant-alert-hide',
		className,
	)

	const [show ,setShow] = useState(true)

	const Close = () => {
		setShow(false);
		onClose()
	}
	
	// TODO
	return (
		<div className={show ? cls : clsError }>
				<div className='ant-alert-content'>
					{message && <div className='ant-alert-message'>{message}</div>}
					{description && <div className='ant-alert-description'>{description}</div>}
				</div>
				{closable && <div>
					<Button onClick={() => Close()} icon={<CloseOutlined />} className='ant-alert-close-icon' />
				</div>}
		</div>
	)
}
