import * as React from 'react';
import type {
  IFn,
  INotificationAPI,
  INotificationConfig,
  INotificationsRef,
  IOpenConfig,
} from './types';
import { INotificationTypes } from './types';

const getDefaultContainer: IFn<HTMLElement> = () => document.body;

type IOpenTask = {
  type: INotificationTypes.OPEN;
  config: IOpenConfig;
};
type ICloseTask = {
  type: INotificationTypes.CLOSE;
  key: React.Key;
};
type IDestroyTask = {
  type: INotificationTypes.DESTROY;
};
type ITask = IOpenTask | ICloseTask | IDestroyTask;
let uniqueKey = 0;

export default function useNotification(
  rootConfig: INotificationConfig = {},
): [INotificationAPI, React.ReactElement] {
  const {
    getContainer = getDefaultContainer,
    prefixCls,
    duration,
    closeIcon,
    closable,
  } = rootConfig;

  // 设置root container
  const [rootContainer, setRootContainer] = React.useState<HTMLElement>();
  // 用来获取组件实例
  const notificationRef = React.useRef<INotificationsRef>();
  const contextHolder = (
    <Notifications container={rootContainer} ref={notificationRef} prefixCls={prefixCls} />
  );
  // 执行弹框队列
  const [taskQueue, setTaskQueue] = React.useState<ITask[]>([]);

  // 获取最新的dom节点
  React.useEffect(() => {
    setRootContainer(getContainer());
  });

  // 表示任务策略
  const taskStrategy: Record<INotificationTypes, IFn<void>> = {
    [INotificationTypes.OPEN](task: IOpenTask) {
      notificationRef.current.open(task.config);
    },
    [INotificationTypes.CLOSE](task: ICloseTask) {
      notificationRef.current.close(task.key);
    },
    [INotificationTypes.DESTROY]() {
      notificationRef.current.destroy();
    },
  };
  // 监听队列 && 开始执行任务
  React.useEffect(() => {
    if (!notificationRef.current || !taskQueue.length) return;

    taskQueue.forEach(task => {
      if (taskStrategy[task.type]) {
        taskStrategy[task.type](task);
      }
    });

    // 清空任务队列
    setTaskQueue([]);
  }, [taskQueue]);

  // 设置返回的api
  const Api = React.useMemo<INotificationAPI>(
    () => ({
      open(config) {
        const mergeConfig = Object.assign(config);
        if (mergeConfig.key === null || mergeConfig.key === undefined) {
          mergeConfig.key = `study-notification-${uniqueKey}`;
          uniqueKey++;
        }

        // 添加进去队列中
        setTaskQueue(queue => [...queue, { type: INotificationTypes.OPEN, config: mergeConfig }]);
      },
      close(key) {
        setTaskQueue(queue => [...queue, { type: INotificationTypes.CLOSE, key }]);
      },
      destroy() {
        setTaskQueue(queue => [...queue, { type: INotificationTypes.DESTROY }]);
      },
    }),
    [],
  );

  return [Api, contextHolder];
}
