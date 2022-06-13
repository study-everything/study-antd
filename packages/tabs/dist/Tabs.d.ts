import React from 'react';
import type { TabsProps as RcTabsProps } from 'rc-tabs';
import { TabPaneProps } from 'rc-tabs';
export declare type TabsType = 'line' | 'card';
export interface TabsProps extends RcTabsProps {
    className?: string;
    style?: React.CSSProperties;
    type?: TabsType;
}
export { TabPaneProps };
export declare function Tabs(props: TabsProps): JSX.Element;
export declare namespace Tabs {
    var TabPane: typeof import("rc-tabs").TabPane;
}
export default Tabs;
