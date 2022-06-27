import React from 'react'
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { cloneElement } from '@study/util';
import { ConfigContext } from 'antd/es/config-provider';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';

export interface BreadcrumbProps {
  separator?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface BreadcrumbInterface extends React.FC<BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
}



const Breadcrumb: BreadcrumbInterface = ({
  separator = '/',
  className,
  style,
  children,
  ...restProps
}) => {
	// TODO
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');

  let crumbs;
  if(children && children) {
    crumbs = toArray(children).map((el, index) => {
      if(!el) return el
      return cloneElement(el, {
        separator,
        key: index
      })
    })
    
  }
  const breadcrumbClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );
  
  return (
    <nav className={breadcrumbClassName} style={style} {...restProps}>
      <ol>{crumbs}</ol>
    </nav>
  );
	// return <div>Breadcrumb</div>
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;
export default Breadcrumb;
