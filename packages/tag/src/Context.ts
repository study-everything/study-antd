import React from "react";

const getPrefixCls = (suffixCls?: string, customerPrefixCls?: string) => {
  if (customerPrefixCls) return customerPrefixCls;
  return suffixCls ? `antd-${suffixCls}` : 'antd';
};

const ConfigContext = React.createContext({
  getPrefixCls,
});


export default ConfigContext