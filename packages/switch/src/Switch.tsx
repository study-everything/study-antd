import * as React from 'react'
import classNames from 'classnames'
import { Wave, warning } from '@study/util'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

export type SwitchSize = 'small' | 'default';

export interface SwitchProps {
	size?: SwitchSize; // 开关大小，可选值：default small
	loading?: boolean; // 加载标识符
	checked?: boolean; // 开关状态
	defaultChecked?: boolean; // 默认开关状态
	disabled?: boolean; // 是否为不可用状态
}


const prefixCls = 'ant-switch'

export const Switch = React.forwardRef<any, SwitchProps>
(
	(
		{
			size: customizeSize,
			checked,
			defaultChecked,
			disabled,
			loading,
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

			if (!disabled) {
				mergedChecked = newChecked;
				setInnerChecked(mergedChecked);
				// onChange?.(mergedChecked, event);
			}

			return mergedChecked;
		}

		function onInternalClick(e: React.MouseEvent<HTMLButtonElement>) {
			const ret = triggerChange(!innerChecked, e);
			// [Legacy] trigger onClick with value
			// onClick?.(ret, e);
		}

		const loadingIcon = (
			<div className={`${prefixCls}-handle`}>
				{loading && <LoadingOutlined className={`${prefixCls}-loading-icon`} />}
			</div>
		);

		const classes = classNames(`${prefixCls}`, {
			[`${prefixCls}-checked`]: innerChecked,
			[`${prefixCls}-disabled`]: disabled,
			[`${prefixCls}-small`]: customizeSize === 'small',
			[`${prefixCls}-loading`]: loading
		})
		return (
			<Wave insertExtraNode>
				<button
					type="button"
					role="switch"
					aria-checked={innerChecked}
					disabled={disabled}
					className={classes}
					ref={ref}
					{...props}
					onClick={onInternalClick}
				>
					{loadingIcon}
				</button>
			</Wave>
		)
	}
)

Switch.displayName = 'Switch';
