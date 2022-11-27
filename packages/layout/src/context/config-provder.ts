import * as React from 'react';

export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface ConfigConsumerProps {
    getTargetContainer?: () => HTMLElement;
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    rootPrefixCls?: string;
    iconPrefixCls?: string;
    direction?: DirectionType;
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  }

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ant-${suffixCls}` : 'ant';
};


export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
});
