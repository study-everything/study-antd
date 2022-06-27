import type React from 'react';
import { useNotification as rcUseNotification } from './rc-notification';

export type ArgsProps = {
  message: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  duration?: number | null;
  getContainer?: () => HTMLElement;
  prefixCls?: string;
};

export interface NotificationInstance {
  success(args: ArgsProps): void;
  error(args: ArgsProps): void;
  info(args: ArgsProps): void;
  warning(args: ArgsProps): void;
}

const useNotification = (): [NotificationInstance, React.ReactElement] => {
  const [instanceApi, ContainerContext] = rcUseNotification();
  let api: NotificationInstance;
  ['success', 'error', 'info', 'warning'].forEach(type => {
    api[type] = (params: ArgsProps) => {
      instanceApi.open(params);
    };
  });

  return [api, ContainerContext];
};



export default useNotification;
