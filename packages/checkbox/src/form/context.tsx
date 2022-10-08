import * as React from 'react';
import type { ReactNode } from 'react';

import type { ValidateStatus } from './FormItem';

export interface FormItemStatusContextProps {
  isFormItemInput?: boolean;
  status?: ValidateStatus;
  hasFeedback?: boolean;
  feedbackIcon?: ReactNode;
}

export const FormItemInputContext = React.createContext<FormItemStatusContextProps>({});
