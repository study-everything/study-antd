import React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classname';
import { RightOutlined } from '@ant-design/icons';
import { cloneElement } from '@study/util';
import type { DropdownInterface } from './types';
import getPlacements from './placements';
import 'rc-dropdown/assets/index.css';
import './style';

function getGlobalPrefixCls() {
  return 'ant';
}

type OverlayFunc = () => React.ReactElement;

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

  const renderOverlay = (prefix: string) => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    const { overlay } = props;

    let overlayNode;
    if (typeof overlay === 'function') {
      overlayNode = (overlay as OverlayFunc)();
    } else {
      overlayNode = overlay;
    }
    overlayNode = React.Children.only(
      typeof overlayNode === 'string' ? <span>{overlayNode}</span> : overlayNode,
    );

    const overlayProps = overlayNode.props;

    // menu cannot be selectable in dropdown defaultly
    const { selectable = false, expandIcon } = overlayProps;

    const overlayNodeExpandIcon =
      typeof expandIcon !== 'undefined' && React.isValidElement(expandIcon) ? (
        expandIcon
      ) : (
        <span className={`${prefix}-menu-submenu-arrow`}>
          <RightOutlined className={`${prefix}-menu-submenu-arrow-icon`} />
        </span>
      );

    const fixedModeOverlay =
      typeof overlayNode.type === 'string'
        ? overlayNode
        : cloneElement(overlayNode, {
            mode: 'vertical',
            selectable,
            expandIcon: overlayNodeExpandIcon,
          });

    return fixedModeOverlay as React.ReactElement;
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
      overlay={() => renderOverlay(prefixCls)}
    >
      {dropdownTrigger}
    </RcDropdown>
  );
};

Dropdown.Button = {};

export default Dropdown;
