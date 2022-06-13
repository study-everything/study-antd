import React from 'react';
import classnames from 'classname';
import type { TabsProps as RcTabsProps } from 'rc-tabs';
import RcTabs, { TabPane, TabPaneProps } from 'rc-tabs';

export type TabsType = 'line' | 'card';

export interface TabsProps extends RcTabsProps {
  className?: string;
  style?: React.CSSProperties;
  type?: TabsType; // 页签的基本样式，可选 line、card
}

export { TabPaneProps };

export function Tabs(props: TabsProps) {
  // return null
  // TODO
  const { className, direction, style, type } = props;
  const { prefixCls: customizePrefixCls } = props;

  const classes = classnames('tab-wrapper', className, customizePrefixCls, {
    [`tabs-${type}`]: type === 'card',
  });

  return <RcTabs direction={direction} {...props} className={classes} style={style} />;
}
Tabs.TabPane = TabPane;

export default Tabs;
