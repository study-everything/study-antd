import React from 'react'

export interface ConfigConsumerProps {
    getTargetContainer?: () => HTMLElement;
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `ant-${suffixCls}` : 'ant';
}

let context = React.createContext<ConfigConsumerProps>({
    getPrefixCls: defaultGetPrefixCls
});

export default context;
