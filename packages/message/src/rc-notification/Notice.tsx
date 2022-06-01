import React from 'react';

export interface NoticeConfig {
  content?: React.ReactNode;
  duration?: number | null;
  closeIcon?: React.ReactNode;
  closable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** @private Internal usage. Do not override in your code */
  props?: React.HTMLAttributes<HTMLDivElement> & Record<string, any>;
  onClose?: VoidFunction;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export interface NoticeProps extends Omit<NoticeConfig, 'onClose'> {
  prefixCls: string;
  className?: string;
  eventKey: React.Key;
  onNoticeClose?: (key: React.Key) => void;
}

const Notice = React.forwardRef<HTMLDivElement, NoticeProps>((props, ref) => {
  return <div>Notice</div>;
});

export default Notice;
