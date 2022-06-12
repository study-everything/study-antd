import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSMotionList, CSSMotionProps } from 'rc-motion';
import Notice, { NoticeConfig } from './Notice';
import classNames from 'classnames';
import ReactDom from 'react-dom/client';
import './index.less';

export interface OpenConfig extends NoticeConfig {
  key: React.Key;
  content?: React.ReactNode;
  duration?: number | null;
}

export interface NotificationProps {
  prefixCls?: string;
  motion?: CSSMotionProps;
  container?: HTMLElement;
  maxCount?: number;
  className?: string;
  style?: React.CSSProperties;
  onAllRemoved?: VoidFunction;
  transitionName?: string;
  animation?: string;
}

export interface NotificationsRef {
  open: (config: OpenConfig) => void;
  close: (key: React.Key) => void;
  destroy: () => void;
}

const Notification = forwardRef<NotificationsRef, NotificationProps>((props, ref) => {
  const {
    prefixCls = 'rc-notification',
    maxCount,
    container,
    transitionName,
    animation,
    className,
    style,
  } = props;
  const [noticeConfigList, setNoticeConfigList] = useState([]);
  const onNoticeClose = key => {
    const targetConfig = noticeConfigList.find(config => config.key === key);
    targetConfig?.onClose?.();
    setNoticeConfigList(list => list.filter(cfg => cfg.key !== key));
  };

  const getTransitionName = () => {
    if (!transitionName && animation) {
      return `${prefixCls}-${animation}`;
    }
    return transitionName;
  };

  useImperativeHandle(ref, () => ({
    open: config => {
      return setNoticeConfigList(preList => {
        let cloneList = [...preList];
        const idx = cloneList.findIndex(cfg => cfg.key === config.key);
        // 如果此notice已存在，则替换
        if (idx > -1) {
          cloneList[idx] = config;
        } else {
          cloneList.push(config);
        }
        /**
         * 如果设置了最大数量，且push之后超过了最大数量，则从数组尾部截取maxCount长度当作新数组
         * 目的是把之前没消失的notice给挤掉，让它们提前消失
         */
        if (maxCount > 0 && cloneList.length > maxCount) {
          cloneList = cloneList.slice(-maxCount);
        }
        return cloneList;
      });
    },
    close: key => onNoticeClose(key),
    destroy: () => setNoticeConfigList([]),
  }));

  if (!container) {
    return null;
  }
  const keys = noticeConfigList.map(config => ({ config, key: config.key }));
  return createPortal(
    /**
     * 最新版本的源码这里其实还根据placement位置属性渲染了多组notification
     * 但是ant-message内部依赖的rc-notification的版本还没实现多组位置，所以我在此省略了相关代码
     * 其实也就是根据传入的placement参数以及对应的config，建立一个map映射，key为placement
     * 值是config数组，渲染时遍历map即可
     */
    <CSSMotionList
      keys={keys}
      motionAppear
      motionEnter
      motionLeave
      motionName={getTransitionName()}
      className={classNames(prefixCls, className)}
      style={style}
    >
      {({ config, className: motionClassName, style: motionStyle }, nodeRef) => {
        return (
          <Notice
            {...config}
            eventKey={config.key}
            prefixCls={prefixCls}
            className={classNames(motionClassName, config.className)}
            style={{ ...motionStyle, ...config.style }}
            ref={nodeRef}
            onNoticeClose={onNoticeClose}
          />
        );
      }}
    </CSSMotionList>,
    container,
  );
});

export const newInstance = (
  properties: NotificationProps,
  callback: (instance: NotificationsRef) => void,
) => {
  const { container } = properties;
  // notification组件会渲染在这个div中
  const div = document.createElement('div');
  if (container) {
    container.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  let mounted = false;
  function notificationRef(notification: NotificationsRef) {
    //设置变量mounted的原因是
    //因为ref回调会在一些生命周期回调之前执行，这里为了保证ref回调在组件的所有生命周期中只执行完整的一次，所以才使用了一个布尔值。
    if (mounted) {
      return;
    }
    mounted = true;
    //传进来的callback函数，把ref传入
    callback(notification);
  }
  const Rooter = ReactDom.createRoot(div);
  Rooter.render(<Notification ref={notificationRef} {...properties} container={div} />);
};

export default Notification;
