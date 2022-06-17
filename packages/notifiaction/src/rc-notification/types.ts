import type React from 'react';

type Partial<T extends object> = {
  [P in keyof T]?: T[P];
};

export type IFn<T> = (...args: any[]) => T;

export type IPlacement = 'topRight';

export const enum INotificationTypes {
  OPEN = 'open',
  CLOSE = 'close',
  DESTROY = 'destroy',
}

export type INotificationConfig = Partial<{
  prefixCls: string;
  getContainer: () => HTMLElement;
  duration: number;
  closeIcon: React.ReactNode;
  closable: boolean;
}>;

export type INoticeConfig = Partial<{
  content: React.ReactNode;
  duration: number;
  closeIcon: React.ReactNode;
  closable: boolean;
  className: string;
  style: React.CSSProperties;
  onClose: IFn<void>;
}>;

export interface IOpenConfig extends INoticeConfig {
  key: React.Key;
  placement?: IPlacement;
}

export type ICommonAPI = {
  open: (config: IOpenConfig) => void;
  close: (key: React.Key) => void;
  destroy: IFn<void>;
};

export type INotificationsRef = Partial<ICommonAPI>;
export type INotificationAPI = Partial<ICommonAPI>;

export type IOpenTask = {
  type: INotificationTypes.OPEN;
  config: IOpenConfig;
};
export type ICloseTask = {
  type: INotificationTypes.CLOSE;
  key: React.Key;
};
export type IDestroyTask = {
  type: INotificationTypes.DESTROY;
};
export type ITask = IOpenTask | ICloseTask | IDestroyTask;
