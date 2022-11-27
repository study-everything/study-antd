/*
 * @Author: Songnana
 * @Date: 2022-08-02 15:12:26
 * @Modified By: modifier Songnana
 * @Descripttion: 
 */

import * as React from 'react';
import classNames from 'classnames';

function isString(str) {
  return typeof str === 'string';
}

export default class Step extends React.Component { 
  onClick = () => {

  }

  renderIconNode = () => {
    const {
      prefixCls,
      description,
      progressDot,
      // stepIcon,
      stepNumber,
      status,
      icon,
      iconPrefix,
      stepIcon,
      icons,
    } = this.props;

    const iconClassName = classNames(`${prefixCls}-icon`, `${iconPrefix}icon`, {
      [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
      // [`${iconPrefix}icon-check`]: !icon && status === 'finish' && (icons && !icons.finish || !icons),
      // [`${iconPrefix}icon-cross`]: !icon && status === 'error' && (icons && !icons.error || !icons)
    });

    let iconNode;
    if (icon && !isString(icon)) { // icon 是组件
      iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>
    } else if (icons && icons.finish && status === 'finish') { // 自定义icons
      iconNode = <span className={`${prefixCls}-icon`}>{icons.finish}</span>;
    } else if (icons && icons.error && status === 'error') { // 自定义icons
      iconNode = <span className={`${prefixCls}-icon`}>{icons.error}</span>;
    }  else if(icon || status === 'finish' || status === 'error') {
      iconNode = <span className={iconClassName} />
    } else  {
      console.log(stepNumber, 'stepNumber')
      iconNode = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    }

    return iconNode
  }

  render() {
    const {
      className,
      prefixCls,
      style,
      active,
      status = 'wait',
      title,
      subTitle,
      description,
      onStepClick,
      icon,
      disabled,
      ...restProps
    } = this.props
    const accessibilityProps = {};
    if (onStepClick && !disabled) {
      accessibilityProps.role = 'button';
      accessibilityProps.tabIndex = 0;
      accessibilityProps.onClick = this.onClick;
    }
    const classString = classNames(`${prefixCls}-item`, `${prefixCls}-item-${status}`, className, {
      [`${prefixCls}-item-custom`]: icon,
      // [`${prefixCls}-item-active`]: active,
      [`${prefixCls}-item-disabled`]: disabled === true
    });
    return (
      <div className={classString} style={style} {...restProps}>
        <div onClick={this.onClick} {...accessibilityProps}  className={`${prefixCls}-item-container`}>
        <div className={`${prefixCls}-item-icon`}>{this.renderIconNode()}</div>

        <div className={`${prefixCls}-item-content`}>
        <div className={`${prefixCls}-item-title`}>
        {title}
        {subTitle && <div title={typeof subTitle === 'string' ? subTitle : undefined} className={`${prefixCls}-item-subtitle`}>{subTitle}</div>}
        </div>
        { description && <div className={`${prefixCls}-item-description`}>{description}</div>}
        </div>
        </div>
      </div>
    )
  }
}