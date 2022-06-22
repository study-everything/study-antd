import * as React from 'react';
import { ConfigContext } from 'antd/es/config-provider';

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
}

interface BreadcrumbSeparatorInterface extends React.FC<BreadcrumbSeparatorProps> {
}

const BreadcrumbSeparator: BreadcrumbSeparatorInterface = ({children}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');

  return <span className={`${prefixCls}-separator`}>{children || '/'}</span>;
}

export default BreadcrumbSeparator