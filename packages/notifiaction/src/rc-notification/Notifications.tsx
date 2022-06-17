import * as React from 'react';
import { createPortal } from 'react-dom';
import { CSSMotionList } from 'rc-motion';
import type { CSSMotionProps } from 'rc-motion';
import classNames from 'classnames';
import type { INoticeConfig, INotificationsRef, IOpenConfig } from './types';

// ========================= 接口定义范围 =========================
export interface NotificationsProps {
  prefixCls?: string;
  container?: HTMLElement;
  className: (placement: Placement) => string;
  motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps);
}
export type Placement = 'topRight';
type Placements = Partial<Record<Placement, IOpenConfig[]>>;

const Notifications = React.forwardRef<Required<INotificationsRef>, NotificationsProps>(
  (props, ref) => {
    const { prefixCls, container, motion, className } = props;
    const [configList, setConfigList] = React.useState<IOpenConfig[]>([]);
    const [placements, setPlacements] = React.useState<Placements>({});

    // 此方法是执行关闭方法的同时 触发onClose事件回调
    const onNoticeClose = (key: React.Key) => {
      const config = configList.find(item => item.key === key);
      config?.onClose?.();

      setConfigList(list => list.filter(item => item.key !== key));
    };

    // ========================= Refs =========================
    React.useImperativeHandle(ref, () => ({
      open: config => {
        setConfigList(list => {
          const clone = [...list];

          const index = clone.findIndex(item => item.key === config.key);
          if (index !== -1) {
            clone[index] = config;
          } else {
            clone.push(config);
          }

          return clone;
        });
      },
      close: onNoticeClose,
      destroy: () => {
        setConfigList([]);
      },
    }));

    React.useEffect(() => {
      const nextPlacements: Placements = {};

      configList.forEach(config => {
        const { placement } = config;

        if (placement) {
          nextPlacements[placement] = nextPlacements[placement] || [];
          nextPlacements[placement].push(config);
        }
      });

      Object.keys(placements).forEach(keyName => {
        nextPlacements[keyName] = nextPlacements[keyName] || [];
      });

      setPlacements(nextPlacements);
    }, [configList]);

    if (!container) return null;

    const placementList = Object.keys(placements) as Placement[];

    return createPortal(
      <>
        {placementList.map(placement => {
          const placementConfigList = placements[placement];
          const keys = placementConfigList.map(config => ({
            config,
            key: config.key,
          }));

          const placementMotion = typeof motion === 'function' ? motion(placement) : motion;

          return (
            <CSSMotionList
              key={placement}
              className={classNames(prefixCls, `${prefixCls}-${placement}`, className?.(placement))}
              keys={keys}
              motionAppear
              {...placementMotion}
            >
              {({ config, className: motionClassName, style: motionStyle }, nodeRef) => {
                const { key } = config as IOpenConfig;
                const { className: configClassName, style: configStyle } = config as INoticeConfig;
  
                return (
                  <Notice
                    {...config}
                    ref={nodeRef}
                    prefixCls={prefixCls}
                    className={classNames(motionClassName, configClassName)}
                    style={{
                      ...motionStyle,
                      ...configStyle,
                    }}
                    key={key}
                    eventKey={key}
                    onNoticeClose={onNoticeClose}
                  />
                );
              }}
            </CSSMotionList>
          );
        })}
      </>,
      container,
    );
  },
);

export default Notifications;
