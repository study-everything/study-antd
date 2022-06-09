
import * as React from 'react'
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import { Tooltip, Button  } from 'antd';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import type { RenderFunction } from './util'
import  { getRenderPropValue } from './util'

export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';
type LegacyButtonType = "default" | "primary" | "ghost" | "dashed" | "link" | "text" | "danger"
export interface PopconfirmProps {
	title: React.ReactNode | RenderFunction
	disabled?: boolean
	onConfirm?:(e?: React.MouseEvent<HTMLElement>) => void
	onCancel?: (e?: React.MouseEvent<HTMLElement>) => void
	okType?: LegacyButtonType
	okText?: React.ReactNode
	cancelText?: React.ReactNode
	okButtonProps?: any;
	cancelButtonProps?: any;
	showCancel?: boolean
	icon?: React.ReactNode
	placement?:TooltipPlacement
	trigger?:'click'
	visible?:boolean
	prefixCls?:string
	overlayClassName?:string
	children:React.ReactNode
	onVisibleChange?:(visible:boolean, e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>) => void
}
export interface PopconfirmState {
	visible?: boolean;
}

export interface PopconfirmLocale {
	okText: string;
	cancelText: string;
}



export const Popconfirm = React.forwardRef<unknown, PopconfirmProps>((props, ref) => {
		
	const [defaultVisible, setDefaultVisible] = React.useState(false)
	const [loading, setLoading] = React.useState(false)
	
	const settingVisible = (
		value: boolean,
		e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
	) => {
		setDefaultVisible(value);
		props.onVisibleChange?.(value, e);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.keyCode === KeyCode.ESC && defaultVisible) {
			settingVisible(false, e)
		}
	}
	
	const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => props.onConfirm?.call(this, e);
	const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		settingVisible(false, e)
		props.onCancel?.call(this, e)
	}
	const onVisibleChange = (value:boolean) => {
		const {disabled=false} = props
		if (disabled) {
			return
		}
		settingVisible(value);
	}


	const renderOverlay = (prefixCls: string) => {
		const {okButtonProps,
			cancelButtonProps,
			title,
			cancelText,
			okText,
			okType = 'primary',
			icon=<ExclamationCircleFilled />,
			showCancel = true,} = props
		function isThenable(thing?: PromiseLike<any>): boolean {
			return !!(thing && !!thing.then);
		}
		const handlePromiseOnOk = (returnValueIsPromise?: PromiseLike<any>) => {
			setLoading(true);
			returnValueIsPromise.then(() => {
				setLoading(false);
				settingVisible(false);
			},
			(e: Error) => {
				console.error(e);
				setLoading(false);
				settingVisible(false);
			}	
			)
		}	
		const  onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
			const returnValueIsPromise = onConfirm(e)
			if (!isThenable(returnValueIsPromise)) {
				settingVisible(false);
				return
			}
			handlePromiseOnOk(returnValueIsPromise)
		}

		return (
			<div className={`${prefixCls}-inner-content`}>
				<div className={`${prefixCls}-message`} >
					{icon}
					<div className={`${prefixCls}-message-title`}>{getRenderPropValue(title)}</div>
				</div>
				<div className={`${prefixCls}-buttons`}>
					{
						showCancel && (
							<Button onClick={onCancel} size="small" {...cancelButtonProps} >
								{cancelText || '取消'}
							</Button>	
						)
					}
					<Button onClick={onClick} size='small' type={okType} {...{ loading, ...okButtonProps }} >
						{okText || '确定'}
					</Button>
				</div>		
			</div>
		)
	}

	const {
		placement='top' ,
		overlayClassName,
		children,
		visible  
	  } = props;
	  const prefixCls = `ant-popover`;	
	  const prefixClsConfirm = `ant-popconfirm`;
	  const overlayClassNames = classNames(prefixClsConfirm, overlayClassName);
	return (
		<Tooltip 
		placement={placement}
		prefixCls={prefixCls}
		trigger='click' 
		overlay = {renderOverlay(prefixCls)}
		overlayClassName={overlayClassNames}
		onVisibleChange={onVisibleChange}
		visible={typeof visible !== 'undefined'? visible: defaultVisible}
		ref={ref as any}
		transitionName="ant-zoom-big"
		>
			{React.cloneElement(children as React.ReactElement,{
				onKeyDown:(e: React.KeyboardEvent<any>) => {
					if (React.isValidElement(children)) {
						children?.props.onKeyDown?.(e)
					}
					onKeyDown(e);
				}
			})}
		</Tooltip>
	)
})





 