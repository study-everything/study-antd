import * as React from 'react';
import classNames from 'classnames';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

import type { RcDrawerProps } from './rc-drawer';

export interface DrawerPanelProps {
  prefixCls: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  onClose?: RcDrawerProps['onClose'];
  /* 头部、尾部、总体样式 */
  drawerStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  children?: React.ReactNode;
};

const DrawerPanel = (props: DrawerPanelProps) => {
  const {
    prefixCls,
    title,
    footer,
    extra,
    closable = true,
    closeIcon = <CloseOutlined/>,
    onClose,
    drawerStyle,
    headerStyle,
    bodyStyle,
    footerStyle,
    children
  } = props;
  // 渲染头部
  const renderHeader = () => {
    if (!title && !closable) {
      return null;
    }
    return (
      <div
        className={classNames(`${prefixCls}-header`, {
            [`${prefixCls}-header-close-only`]: closable && !title && !extra
          }
        )}
        style={headerStyle}
      >
        <div className={`${prefixCls}-header-title`}>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close'
            className={`${prefixCls}-close`}
          >
          {closeIcon}
          </button>
          {
            !!title ? <div className={`${prefixCls}-title`}>{title}</div> : null
          }
          {
            !!extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null
          }
        </div>
      </div>
    )
  }
  // 渲染footer
  const renderFooter = () => {
    if(!footer) return null;
    return (
      <div className={`${prefixCls}-footer`} style={footerStyle}>
        {footer}
      </div>
    )
  }
  return (
    <div
      className={`${prefixCls}-wrapper-body`}
      style={{ ...drawerStyle }}
    >
      {renderHeader()}
      <div className={`${prefixCls}-body`} style={bodyStyle}>
        {children}
      </div>
      {renderFooter()}
    </div>
  )
}

export default DrawerPanel;