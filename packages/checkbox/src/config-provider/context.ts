import React from 'react';
// 前缀拼接函数
const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ant-${suffixCls}` : 'ant';
};

export const ConfigContext = React.createContext<any>({
  getPrefixCls: defaultGetPrefixCls, // 传递类前缀拼接函数
});
export const ConfigConsumer = ConfigContext.Consumer;
