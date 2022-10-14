
import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import Dialog from 'rc-dialog';

import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import type { LegacyButtonType } from 'antd/lib/button/button';
import { convertLegacyProps } from 'antd/lib/button/button';
import type { DirectionType } from 'antd/lib/config-provider';
import { ConfigContext } from 'antd/lib/config-provider';
import { NoFormStyle } from 'antd/lib/form/context';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';

import { getTransitionName } from 'antd/lib/_util/motion';
import { canUseDocElement } from 'antd/lib/_util/styleChecker';
import { getConfirmLocale } from './locale';

let mousePosition: { x: number; y: number } | null;
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  }
  setTimeout(() => {
    mousePosition = null;
  }, 100)
}

// 只有点击事件支持从鼠标位置动画展开
if (canUseDocElement()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

type getContainerFunc = () => HTMLElement;

export interface ModalProps {
  // em,好在不是真的把visible干掉了
  visible?: boolean;
  open?: boolean;
  // 确定按钮
  confirmLoading?: boolean;
  title?: string;
  // 是否显示右上角关闭按钮
  closable?: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  // 所有触发关闭按钮的操作
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  afterClose?: () => void;
  // 是否垂直居中
  centered?: boolean;
  // 宽度
  width?: string | number;
  footer?: React.ReactNode;
  okText?: React.ReactNode;
  // 确认按钮类型
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  // 点击蒙层是否允许关闭
  maskClosable?: boolean;
  // 强制渲染 modal
  forceRender?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  keyboard?: boolean;
  wrapProps?: any;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
  children?: React.ReactNode;
}

export interface ModalFuncProps {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  open?: boolean;
  title?: string;
  closable?: boolean;
  content?: React.ReactNode;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  afterClose?: () => void;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  centered?: boolean;
  width?: string | number;
  okText?: React.ReactNode;
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  icon?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskStyle?: React.CSSProperties;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  keyboard?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
  direction?: DirectionType;
  bodyStyle?: React.CSSProperties;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
}

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    // 获取挂载的包裹容器
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
  } = React.useContext(ConfigContext)

  // 取消回调
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    onCancel?.(e);
  }

  // 确定回调
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  }

  const {
    prefixCls: customizePrefixCls,
    footer,
    visible,
    open = false,
    wrapClassName,
    centered,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,
    width = 520,
    ...restProps
  } = props

  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const defaultFooter = (
    <LocaleReceiver componentName='Modal' defaultLocale={getConfirmLocale()}>
      {contextLocale => {
        const { okText, okType = 'primary', cancelText, confirmLoading = false } = props;

        return (
          <>
            <Button onClick={handleCancel} {...props.cancelButtonProps}>
              {cancelText || contextLocale.cancelText}
            </Button>
            <Button
              {...convertLegacyProps(okType)}
              loading={confirmLoading}
              onClick={handleOk}
              {...props.okButtonProps}
            >
              {okText || contextLocale.okText}
            </Button>
          </>
        )
      }}
    </LocaleReceiver>
  )

  const closeIconToRender = (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
    </span>
  )

  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl',
  })

	// TODO
	return (
    <NoFormStyle status override>
      <Dialog
        width={width}
        {...restProps}
        getContainer={
          getContainer === undefined ? (getContextPopupContainer as getContainerFunc) : getContainer
        }
        prefixCls={prefixCls}
        wrapClassName={wrapClassNameExtended}
        footer={footer === undefined ? defaultFooter : footer}
        visible={open || visible}
        mousePosition={mousePosition}
        onClose={handleCancel}
        closeIcon={closeIconToRender}
        focusTriggerAfterClose={focusTriggerAfterClose}
        transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
        maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
      />
    </NoFormStyle>
  )
}

export default Modal;