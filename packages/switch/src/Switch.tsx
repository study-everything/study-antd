import * as React from 'react'
import classNames from 'classnames'
import { Wave, warning } from '@study/util'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import KeyCode from 'rc-util/lib/KeyCode';

export type SwitchSize = 'small' | 'default';

export type SwitchChangeEventHandler = (
	checked: boolean,
	event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
) => void;
export type SwitchClickEventHandler = SwitchChangeEventHandler;

export interface SwitchProps {
	size?: SwitchSize; // 开关大小，可选值：default small
	className?: string; // 传入的类名
	loading?: boolean; // 加载标识符
	checked?: boolean; // 开关状态
	defaultChecked?: boolean; // 默认开关状态
	disabled?: boolean; // 是否为不可用状态
	autoFocus?: boolean; // 组件是否自动获取焦点
	checkedChildren?: React.ReactNode; // 选中时的内容
	unCheckedChildren?: React.ReactNode; // 非选中时的内容
	onClick?: SwitchClickEventHandler; // 点击事件
	onChange?: SwitchChangeEventHandler; // 标识符change事件
	onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

enum KeyCodeEnum {
	'LEFT'= KeyCode.LEFT,
	'RIGHT'= KeyCode.RIGHT
}

const prefixCls = 'ant-switch'

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>
(
	(
		{
			size: customizeSize,
			autoFocus = false,
			className,
			checked,
			defaultChecked,
			checkedChildren,
			unCheckedChildren,
			disabled,
			loading,
			onClick,
			onChange,
			onKeyDown,
			...props
		},
		ref
	) => {
		warning(
			'checked' in props || !('value' in props),
			'Switch',
			'`value` is not a valid prop, do you mean `checked`?',
		);

		const [innerChecked, setInnerChecked] = useMergedState<boolean>(false, {
			value: checked,
			defaultValue: defaultChecked
		})

		function triggerChange(
			newChecked: boolean,
			event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
		) {
			let mergedChecked = innerChecked;
			// 非禁用状态下
			if (!disabled) {
				mergedChecked = newChecked;
				setInnerChecked(mergedChecked);
				// 执行change回调 注入标识符
				onChange?.(mergedChecked, event);
			}

			return mergedChecked;
		}

		const strategyMatchKeyCode = {
			[KeyCodeEnum.LEFT]: (e) => {
				triggerChange(false, e);
			},
			[KeyCodeEnum.RIGHT]: (e) => {
				triggerChange(true, e);
			}
		}


		const onInternalKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
			try {
				strategyMatchKeyCode[e.which](e);
				onKeyDown?.(e);
			} catch (err: any) {
				console.error(`onInternalKeyDown error:${err.message}`)
			}
		}

		function onInternalClick(e: React.MouseEvent<HTMLButtonElement>) {
			const ret = triggerChange(!innerChecked, e);
			// 执行回调事件 注入对应的标识符
			onClick?.(ret, e);
		}

		const loadingIcon = (
			<div className={`${prefixCls}-handle`}>
				{loading && <LoadingOutlined className={`${prefixCls}-loading-icon`} />}
			</div>
		);

		const classes = classNames(`${prefixCls}`, className, {
			[`${prefixCls}-checked`]: innerChecked,
			[`${prefixCls}-disabled`]: disabled,
			[`${prefixCls}-small`]: customizeSize === 'small',
			[`${prefixCls}-loading`]: loading,
		})

		return (
			<Wave insertExtraNode>
				<button
					type="button"
					role="switch"
					aria-checked={innerChecked}
					disabled={disabled || loading}
					className={classes}
					ref={ref}
					{...props}
					onClick={onInternalClick}
					onKeyDown={onInternalKeyDown}
				>
					{loadingIcon}
					<span className={`${prefixCls}-inner`}>
						{innerChecked ? checkedChildren : unCheckedChildren }
					</span>
				</button>
			</Wave>
		)
	}
)

Switch.displayName = 'Switch';
