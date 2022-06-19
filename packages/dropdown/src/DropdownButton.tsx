import React from 'react';
import { Button } from 'antd';
import cn from 'classname';
import { DropdownButtonProps, DropdownProps } from './types';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import Dropdown from './Dropdown';


function getGlobalPrefixCls() {
  return 'ant';
}


const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
};

const ButtonGroup = Button.Group;

export default function DropdownButton(props: DropdownButtonProps) {
  const {
    prefixCls: originPrefixCls,
    type = 'default',
    disabled,
    loading,
    onClick,
    htmlType,
    children,
    className,
    overlay,
    trigger,
    align,
    visible,
    onVisibleChange,
    placement,
    getPopupContainer,
    href,
    icon = <EllipsisOutlined />,
    title,
    buttonsRender = (buttons: React.ReactNode[]) => buttons,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyPopupOnHide,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('dropdown-button', originPrefixCls);
  const dropdownProps = {
    align,
    overlay,
    disabled,
    trigger: disabled ? [] : trigger,
    onVisibleChange,
    // getPopupContainer: getPopupContainer || getContextPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyPopupOnHide,
  } as DropdownProps;


  const leftButton = (
    <Button
      type={type}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      htmlType={htmlType}
      href={href}
      title={title}
    >
      {children}
    </Button>
  );

  const rightButton = <Button type={type} icon={icon} />;

  const [leftButtonToRender, rightButtonToRender] = buttonsRender!([leftButton, rightButton]);
  
  
  return (
    <ButtonGroup {...restProps} className={cn(prefixCls, className)}>
      {leftButtonToRender}
      <Dropdown {...dropdownProps}>{rightButtonToRender}</Dropdown>
    </ButtonGroup>
  )
}

