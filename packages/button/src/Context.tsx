import * as React from 'react';

export type AvatarSize = 'large' | 'small' | 'default' | number;
export type AvatarShape = 'circle' | 'square'

export const SizeContext = React.createContext<AvatarSize>('default');
SizeContext.displayName = "SizeContext"
interface SizeContextPorps {
  children?: React.ReactNode;
  size?: AvatarSize
}
export const SizeContextProvider: React.FC<SizeContextPorps> = ({ children, size }) => (
  <SizeContext.Consumer>
      {originSize => (
        <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>
      )}
    </SizeContext.Consumer>
  )

const getPrefixCls = (suffixCls?: string, customerPrefixCls?: string) => {
  if (customerPrefixCls) return customerPrefixCls
  return suffixCls ? `antd-${suffixCls}`: 'antd'
}

export const ConfigContext = React.createContext({
  getPrefixCls
})

