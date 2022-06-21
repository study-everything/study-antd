import React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classname';
import { cloneElement } from '@study/util';
import type { DropdownInterface } from './types';
import getPlacements from './placements';
import 'rc-dropdown/assets/index.css';
import './style';
import DropdownButton from './DropdownButton';

function getGlobalPrefixCls() {
  return 'ant';
}


const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
};

const Dropdown: DropdownInterface = props => {
  const { children, arrow, trigger, disabled, placement, overlayClassName, ...rests } = props;

  const prefixCls = getPrefixCls('dropdown', props.prefixCls);
  const child = React.Children.only(children) as React.ReactElement<any>;

  const dropdownTrigger = cloneElement(child, {
    className: classNames(`${prefixCls}-trigger`, child.props.className),
    disabled,
  });

  const triggerActions = disabled ? [] : trigger;

  const getTransitionName = () => {
    const rootPrefixCls = getPrefixCls();
    const { transitionName } = props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (props.placement && props.placement.indexOf('top') >= 0) {
      return `${rootPrefixCls}-slide-down`;
    }
    return `${rootPrefixCls}-slide-up`;
  };

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    autoAdjustOverflow: true,
  });

  return (
    <RcDropdown
      {...rests}
      builtinPlacements={builtinPlacements}
      arrow={!!arrow}
      overlayClassName={overlayClassName}
      prefixCls={prefixCls}
      transitionName={getTransitionName()}
      trigger={triggerActions}
      placement={placement}
    >
      {dropdownTrigger}
    </RcDropdown>
  );
};

Dropdown.Button = DropdownButton;

export default Dropdown;
