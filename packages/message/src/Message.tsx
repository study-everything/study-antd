import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  LoadingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useNotification } from './rc-notification';

export interface MessageProps {}

const typeToIcon = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  loading: LoadingOutlined,
};

export const Message: React.FC<MessageProps> = props => {
  // TODO
  return <div>Message111</div>;
};
