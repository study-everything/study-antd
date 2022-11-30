import * as React from "react";
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import KeyCode from "rc-util/lib/KeyCode"
import DrawerPanel from "./DrawerPanel";
import RcDrawerContext from "./context";

import type { CSSMotionProps } from 'rc-motion';
import type { RcDrawerContextProps } from "./context";

const sentinelStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  outline: 'none',
  position: 'absolute',
};
export type Placement = 'top'|'right'|'bottom'|'left';
export interface PushConfig {
  distance?: number | string;
}

export interface DrawerPopupProps {
  // 类名前缀
  prefixCls: string;
  //是否打开
  open?: boolean;
  inline?: boolean;
  push?: boolean | PushConfig;
  // 预渲染 Drawer 内元素
  forceRender?: boolean;
  autoFocus?: boolean;
  // 是否支持键盘 esc 关闭
  keyboard?: boolean;
  // 根组件
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
  zIndex?: number;
  placement?: Placement;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  contentWrapperStyle?: React.CSSProperties;
  mask?: boolean;
  maskClosable?: boolean;
  maskClassName?: string;
  maskStyle?: React.CSSProperties;
  motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps);
  maskMotion?: CSSMotionProps;
  afterOpenChange?: (open: boolean) => void;
  onClose?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
}

const DrawerPopup = (props: DrawerPopupProps) => {
  const {
    prefixCls,
    open,
    placement,
    inline,
    push,
    forceRender,
    autoFocus,
    keyboard,
    rootClassName,
    rootStyle,
    zIndex,
    className,
    style,
    motion,
    width,
    height,
    children,
    contentWrapperStyle,
    mask,
    maskClosable,
    maskMotion,
    maskClassName,
    maskStyle,
    afterOpenChange,
    onClose,
  } = props;
  const panelRef = React.useRef<HTMLDivElement>();
  const sentinelStartRef = React.useRef<HTMLDivElement>();
  const sentinelEndRef = React.useRef<HTMLDivElement>();
  const [pushed, setPushed] = React.useState(false);
  const parentContext = React.useContext(RcDrawerContext);
  let pushConfig: PushConfig;
  if(push === false) {
    pushConfig = { distance: 0 }
  }else if(push === true) {
    pushConfig = {}
  }else {
    pushConfig = push || {};
  }
  const pushDistance = pushConfig?.distance ?? parentContext?.pushDistance ?? 180;
  const mergedContext = React.useMemo<RcDrawerContextProps>(() => ({
    pushDistance,
    push: () => {
      setPushed(true);
    },
    pull: () => {
      setPushed(false);
    },
  }),[pushDistance]);
  React.useEffect(() => {
    // 如果需要自动聚焦就自动聚焦
    if (open && autoFocus) {
      panelRef.current?.focus({ preventScroll: true });
    }
  }, [open, autoFocus]);
  React.useEffect(() => {
    if (open) {
      parentContext?.push?.();
    } else {
      parentContext?.pull?.();
    }
  }, [open]);
  React.useEffect(() => () => parentContext?.pull?.(),[]);
  const onPanelKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    const { keyCode, shiftKey } = event;
    switch(keyCode) {
      // tab 按钮
      case KeyCode.TAB:
        if(keyCode === KeyCode.TAB) {
          if (!shiftKey && document.activeElement === sentinelEndRef.current) {
            sentinelStartRef.current?.focus({ preventScroll: true });
          }else if(shiftKey && document.activeElement === sentinelStartRef.current) {
            sentinelEndRef.current?.focus({ preventScroll: true });
          }
        }
      break;
      // 关闭按钮
      case KeyCode.ESC:
        if(!!onClose && !!keyboard) {
          onClose(event);
        }
      break;
    }
  }
  const maskNode: React.ReactNode = mask ? (
    <CSSMotion
      key="mask"
      visible={open}
      {...maskMotion}
    >
      {
        ({ className: motionMaskClassName, style: motionMaskStyle }, maskRef) => {
          return (
            <div
              ref={maskRef}
              onClick={maskClosable ? onClose : undefined}
              className={classNames(
                `${prefixCls}-mask`,
                motionMaskClassName,
                maskClassName
              )}
              style={{
                ...motionMaskStyle,
                ...maskStyle
              }}
            >

            </div>
          )
        }
      }
    </CSSMotion>
  ) : null;
  const motionProps = typeof motion === 'function' ? motion(placement) : motion;
  const wrapperStyle: React.CSSProperties = {};
  if (pushed && pushDistance) {
    switch (placement) {
      case 'top':
        wrapperStyle.transform = `translateY(${pushDistance}px)`;
        break;
      case 'bottom':
        wrapperStyle.transform = `translateY(${-pushDistance}px)`;
        break;
      case 'left':
        wrapperStyle.transform = `translateX(${pushDistance}px)`;
        break;
      default:
        wrapperStyle.transform = `translateX(${-pushDistance}px)`;
        break;
    }
  }
  if (placement === 'left' || placement === 'right') {
    wrapperStyle.width = +width;
  } else {
    wrapperStyle.height = +height;
  }
  const panelNode: React.ReactNode = (
    <CSSMotion
      key="panel"
      visible={open}
      forceRender={forceRender}
      onVisibleChanged={nextVisible => {
        afterOpenChange?.(nextVisible);
      }}
      removeOnLeave={false}
      leavedClassName={`${prefixCls}-content-wrapper-hidden`}
      {...motionProps}
    >
      {
        ({ className: motionClassName, style: motionStyle }, motionRef) => {
          return (
            <div
              className={classNames(
                `${prefixCls}-content-wrapper`,
                motionClassName,
              )}
              style={{
                ...wrapperStyle,
                ...motionStyle,
                ...contentWrapperStyle,
              }}
            >
              <DrawerPanel
                containerRef={motionRef}
                prefixCls={prefixCls}
                className={className}
                style={style}
              >
                {children}
              </DrawerPanel>
            </div>
          )
        }
      }
    </CSSMotion>
  )
  const containerStyle: React.CSSProperties = { ...rootStyle };
  if(zIndex !== undefined) {
    containerStyle.zIndex = zIndex;
  }
  return (
    <RcDrawerContext.Provider value={mergedContext}>
      <div
        className={classNames(
          prefixCls,
          `${prefixCls}-${placement}`,
          rootClassName,
          {
            [`${prefixCls}-open`]: open,
            [`${prefixCls}-inline`]: inline
          }
        )}
        style={containerStyle}
        tabIndex={-1}
        ref={panelRef}
        onKeyDown={onPanelKeyDown}
      >
        {maskNode}
        <div
          tabIndex={0}
          ref={sentinelStartRef}
          style={sentinelStyle}
          aria-hidden="true"
          data-sentinel="start"
        />
        {panelNode}
        <div
          tabIndex={0}
          ref={sentinelEndRef}
          style={sentinelStyle}
          aria-hidden="true"
          data-sentinel="end"
        />
      </div>
    </RcDrawerContext.Provider>
  )
}

export default DrawerPopup;