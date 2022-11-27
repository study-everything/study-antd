/*
 * @Author: Songnana
 * @Date: 2022-07-07 14:15:44
 * @Modified By: modifier Songnana
 * @Descripttion: 
 */

import React, {cloneElement} from 'react'
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';



export default class Steps extends React.Component {
	static defaultProps = {
		type: 'default',
		prefixCls: 'ant-step',
		iconPrefix: 'ant',
		direction: 'horizontal',
		// labelPlacement: 'horizontal',
		initial: 0,
		current: 0,
		status: 'process',
		size: '',
		progressDot: false,
	};

	render() {
		const {
			type,
			prefixCls,
			className,
			children,
			direction,
			// labelPlacement,
			iconPrefix,
			status,
			size,
			current,
			progressDot,
			stepIcon,
			initial,
			icons,
			onChange,
			style = {},
			...restProps
		} = this.props;

		const isNav = type === 'navigation';
		const classNameString = classNames(prefixCls, `${prefixCls}-${direction}`, className, {
			[`${prefixCls}-navigation`]: isNav
		})
		// TODO
		return (<div 
			className={classNameString}
			style={style}
			{...restProps}

		>
			{
				toArray(children).map((child, index) => {
					const stepNumber = initial + index;

					const childProps = {
						stepNumber: `${stepNumber + 1}`,
						stepIndex: stepNumber,
						key: stepNumber,
						prefixCls,
						wrapperStyle: style,
						onStepClick: onChange && this.onStepClick,
						iconPrefix,
						icons,
						...child.props,
					};

					if (!child.props.status) {
						if (stepNumber === current) {
							childProps.status = status;
						} else if (stepNumber < current) {
							childProps.status = 'finish'
						} else {
							childProps.status = 'wait';
						}
					}
					// childProps.active = stepNumber === current;
					return cloneElement(child, childProps)
				})
			}
		</div>)
	}
}