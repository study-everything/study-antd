import React, { forwardRef, useEffect, useState } from 'react';
import classnames from 'classnames';

export interface NoticeConfig {
  content?: React.ReactNode;
  duration?: number | null;
  closeIcon?: React.ReactNode;
  closable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClose?: VoidFunction;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export interface NoticeProps extends Omit<NoticeConfig, 'onClose'> {
  prefixCls: string;
  className?: string;
  eventKey: React.Key;
  onNoticeClose?: (key: React.Key) => void;
}

const Notice = forwardRef<HTMLDivElement, NoticeProps>((props, ref) => {
  const {
    content,
    duration = 3,
    className,
    prefixCls,
    eventKey,
    onNoticeClose,
    onClick,
    closable,
    closeIcon,
    ...restProps
  } = props;
  // notice类名前缀
  const noticePrefixCls = `${prefixCls}-notice`;
  // notice自身内部关闭方法
  const onInternalClose = () => {
    // 调用外部notification传入的关闭方法，并把key传入
    typeof onNoticeClose === 'function' && onNoticeClose(eventKey);
  };
  // 标识鼠标是否hover状态
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    /**
     * 监听hovering，当组件不是hover状态的情况下，创建定时器，延迟到后执行onInternalClose方法
     * 如果设置了duration为小于等于0的值时，不会创建定时器，也就是说此组件将不会自动关闭（因为没有执行onInternalClose方法）
     */
    if (duration > 0 && !hovering) {
      const timer = setTimeout(() => {
        // console.log('时间到啦--');
        onInternalClose();
      }, duration * 1000);

      /**
       *  在每次hovering变化的时候清除上一次创建的定时器
       * 当然，组件卸载的时候也要清除
       */
      return () => {
        // console.log('清除定时器啦--');
        clearTimeout(timer);
      };
    }
  }, [hovering, duration]);
  
  return (
    <div
      {...restProps}
      ref={ref}
      className={classnames(noticePrefixCls, className, {
        [`${noticePrefixCls}-closable`]: closable,
      })}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      onClick={onClick}
    >
      <div className={`${noticePrefixCls}-content`}>{content}</div>
      {closable && (
        <a
          className={`${noticePrefixCls}-close`}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onInternalClose();
          }}
        >
          {closeIcon}
        </a>
      )}
    </div>
  );
});

export default Notice;
