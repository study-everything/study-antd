import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  LoadingOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import {
  newInstance as newMessageInstance,
  NotificationsRef as MessageInstanceProps,
} from './rc-notification/Notification';

const typeToIcon = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  loading: LoadingOutlined,
};

let messageInstance: MessageInstanceProps | null;
let defaultDuration = 3;
let defaultTop: number;
let key = 1;
let localPrefixCls = 'ant-message';
let transitionName = 'move-up';
let container: HTMLElement;
let maxCount: number;

export function getKeyThenIncreaseKey() {
  return key++;
}

export type NoticeType = keyof typeof typeToIcon;
export const typeList = Object.keys(typeToIcon) as NoticeType[];
export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  container?: HTMLElement;
  transitionName?: string;
  maxCount?: number;
  // rtl?: boolean;
}

export interface ArgsProps {
  content: any;
  duration?: number;
  type?: NoticeType;
  prefixCls?: string;
  rootPrefixCls?: string;
  container?: HTMLElement;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

type ConfigContent = React.ReactNode;
type ConfigDuration = number | (() => void);
type JointContent = ConfigContent | ArgsProps;
export type ConfigOnClose = () => void;
export interface MessageType extends PromiseLike<any> {
  (): void;
}
export interface MessageInstance {
  info(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  success(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  error(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  warning(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  loading(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  open(args: ArgsProps): MessageType;
}

export interface MessageApi extends MessageInstance {
  warn(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  config(options: ConfigOptions): void;
  destroy(messageKey?: React.Key): void;
  useMessage(): [MessageInstance, React.ReactElement];
}
// ????????????????????????????????????
const setMessageConfig = (options: ConfigOptions) => {
  if (options.top !== undefined) {
    defaultTop = options.top;
    messageInstance = null; // ????????????top??????????????????????????????messageInstance
  }
  if (options.duration !== undefined) {
    defaultDuration = options.duration;
  }

  if (options.prefixCls !== undefined) {
    localPrefixCls = options.prefixCls;
  }
  if (options.container !== undefined) {
    container = options.container;
    messageInstance = null; // ????????????container???????????????????????????messageInstance
  }
  if (options.transitionName !== undefined) {
    transitionName = options.transitionName;
    messageInstance = null; // ????????????transitionName???????????????????????????messageInstance
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
    messageInstance = null; // ????????????maxCount???????????????????????????messageInstance
  }
  // if (options.rtl !== undefined) {
  //   rtl = options.rtl;
  // }
};

const getMessageInstanceProps = (args: ArgsProps, callback) => {
  const { prefixCls: customPreFixCls } = args;
  const prefixCls = customPreFixCls || localPrefixCls;
  if (messageInstance) {
    callback({
      prefixCls,
      instance: messageInstance,
    });
    return;
  }

  newMessageInstance(
    {
      prefixCls,
      transitionName: `${prefixCls}-${transitionName}`,
      style: { top: defaultTop }, // ?????????????????????
      container: args.container || container || document.body,
      maxCount,
    },
    (instance: MessageInstanceProps) => {
      if (messageInstance) {
        callback({
          prefixCls,
          instance: messageInstance,
        });
        return;
      }
      messageInstance = instance;
      callback({ prefixCls, instance });
    },
  );
};
const getRCNoticeProps = (args: ArgsProps, prefixCls: string) => {
  const duration = args.duration !== undefined ? args.duration : defaultDuration;
  const IconComponent = typeToIcon[args.type!];
  const messageClass = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${args.type}`]: args.type,
  });
  return {
    key: args.key,
    duration,
    style: args.style || {},
    className: args.className,
    content: (
      <div className={messageClass}>
        {args.icon || (IconComponent && <IconComponent />)}
        <span>{args.content}</span>
      </div>
    ),
    onClose: args.onClose,
    onClick: args.onClick,
  };
};

const notice = (args: ArgsProps) => {
  const target = args.key || getKeyThenIncreaseKey();
  /**
   * ??????promise??????
   */
  const closePromise = new Promise(resolve => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      resolve(true);
    };
    getMessageInstanceProps(args, ({ prefixCls, instance }) => {
      instance.open(getRCNoticeProps({ ...args, key: target, onClose: callback }, prefixCls));
    });
  });
  const result = () => {
    if (messageInstance) {
      messageInstance.close(target);
    }
  };
  result.then = (filled, rejected) => closePromise.then(filled, rejected);
  return result;
};

const message: any = {
  open: notice,
  config: setMessageConfig,
  destroy(messageKey?: React.Key) {
    if (messageInstance) {
      if (messageKey) {
        const { close } = messageInstance;
        close(messageKey);
      } else {
        const { destroy } = messageInstance;
        destroy();
        messageInstance = null;
      }
    }
  },
};
/**
 * ??????????????????????????????????????????
 */
function isArgsProps(content: ArgsProps): boolean {
  return Object.prototype.toString.call(content) === '[object Object]' && !!content.content;
}
/**
 * ???message??????success???error????????????????????????
 */
typeList.forEach(type => {
  message[type] = (content: ArgsProps, duration?: number, onClose?: () => void) => {
    // ????????????????????????????????????
    if (isArgsProps(content)) {
      return message.open({ ...content, type });
    }
    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }
    return message.open({ content, duration, type, onClose });
  };
});
message.warn = message.warning;

export default message as MessageApi;
