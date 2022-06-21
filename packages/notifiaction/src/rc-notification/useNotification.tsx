import * as React from 'react';
import type { CSSMotionProps } from 'rc-motion';
import Notifications from './Notifications';
import type { Placement, NotificationsRef, OpenConfig } from './Notifications';

const defaultGetContainer = () => document.body;

type OptionalConfig = Partial<OpenConfig>;

export interface NotificationConfig {
  prefixCls?: string;
  /** Customize container. It will repeat call which means you should return same container element. */
  getContainer?: () => HTMLElement;
  motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps);
  closeIcon?: React.ReactNode;
  closable?: boolean;
  maxCount?: number;
  duration?: number;
  /** @private. Config for notification holder style. Safe to remove if refactor */
  className?: (placement: Placement) => string;
  /** @private. Config for notification holder style. Safe to remove if refactor */
  style?: (placement: Placement) => React.CSSProperties;
  /** @private Trigger when all the notification closed. */
  onAllRemoved?: VoidFunction;
}

export interface NotificationAPI {
  open: (config: OptionalConfig) => void;
  close: (key: React.Key) => void;
  destroy: () => void;
}

interface OpenTask {
  type: 'open';
  config: OpenConfig;
}

interface CloseTask {
  type: 'close';
  key: React.Key;
}

interface DestroyTask {
  type: 'destroy';
}

type Task = OpenTask | CloseTask | DestroyTask;

let uniqueKey = 0;

function mergeConfig<T>(...objList: Partial<T>[]): T {
  const clone: T = {} as T;

  objList.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];

        if (val !== undefined) {
          clone[key] = val;
        }
      });
    }
  });

  return clone;
}

// 表示入口函数
export default function useNotification(
  rootConfig: NotificationConfig = {},
): [NotificationAPI, React.ReactElement] {
  const {
    // 表示要挂载的容器节点
    getContainer = defaultGetContainer,
    motion,
    // 表示组件共同前缀
    prefixCls,
    // 存在最大的个数
    maxCount,
    className,
    style,
    onAllRemoved,
    ...shareConfig
  } = rootConfig;

  const [container, setContainer] = React.useState<HTMLElement>();
  // 表示组件实例 方便使用实例来调用open close destroy
  const notificationsRef = React.useRef<NotificationsRef>();

  // 表示需要渲染的组件
  const contextHolder = (
    <Notifications
      container={container}
      ref={notificationsRef}
      prefixCls={prefixCls}
      motion={motion}
      maxCount={maxCount}
      className={className}
      style={style}
      onAllRemoved={onAllRemoved}
    />
  );

  // 多个消息弹框的 队列
  const [taskQueue, setTaskQueue] = React.useState<Task[]>([]);

  // ========================= Refs =========================
  // 使用React.useMemo 进行缓存
  const api = React.useMemo<NotificationAPI>(
    () => ({
      open: config => {
        const mergedConfig = mergeConfig(shareConfig, config);
        // 设置key 一般都是用来删除的
        if (mergedConfig.key === null || mergedConfig.key === undefined) {
          mergedConfig.key = `rc-notification-${uniqueKey}`;
          uniqueKey += 1;
        }

        // 就是将所有的任务 都加入队列中 之后循环依次执行队列中的任务
        setTaskQueue(queue => [...queue, { type: 'open', config: mergedConfig }]);
      },
      close: key => {
        setTaskQueue(queue => [...queue, { type: 'close', key }]);
      },
      destroy: () => {
        setTaskQueue(queue => [...queue, { type: 'destroy' }]);
      },
    }),
    [],
  );

  // ======================= Container ======================
  // React 18 should all in effect that we will check container in each render
  // Which means getContainer should be stable.
  React.useEffect(() => {
    // 设置最新的dom节点
    setContainer(getContainer());
  });

  // ======================== Effect ========================
  // 监听队列 开始执行任务
  React.useEffect(() => {
    // Flush task when node ready
    if (notificationsRef.current && taskQueue.length) {
      taskQueue.forEach(task => {
        switch (task.type) {
          case 'open':
            notificationsRef.current.open(task.config);
            break;

          case 'close':
            notificationsRef.current.close(task.key);
            break;

          case 'destroy':
            notificationsRef.current.destroy();
            break;

          default:
            break;
        }
      });

      setTaskQueue([]);
    }
  }, [taskQueue]);

  // ======================== Return ========================
  return [api, contextHolder];
}
