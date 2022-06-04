import React from 'react';

import classnames from 'classnames';

export type inputSize = 'large' | 'middle' | 'small';
export interface InputProps {
  maxLength?: number;
  size?: inputSize;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: () => void;
  defaultValue?: string;
  bordered?: string;
  className?: string;
  prefixCls?: string;
}

export const Input: React.FC<InputProps> = props => {
  const { className, prefixCls = 'ant-btn', size = 'middle', type = 'text' } = props;

  const classes = classnames(className, {
    [`${prefixCls}-${size}`]: true,
  });

  return (
    <>
      <input className={classes} type={type} />
    </>
  );
};
