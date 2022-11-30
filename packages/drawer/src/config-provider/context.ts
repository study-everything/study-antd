import * as React from 'react';

export type DirectionType = 'ltr' | 'rtl' | undefined;
export const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if(!!customizePrefixCls) return customizePrefixCls;
  return !!suffixCls ? `ant-${suffixCls}` : 'ant';
};
export const defaultGetPopupContainer = (triggerNode?: HTMLElement) => triggerNode;

export interface ConfigConsumerProps {
  direction?: DirectionType;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}
const context = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
  getPopupContainer: defaultGetPopupContainer
});

export default context;