import React from 'react';

import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { cloneElement } from '@study/util';
import type { LiteralUnion } from '@study/util';
import { ConfigContext } from './config-provider';
import type { PresetColorType, PresetStatusColorType } from './utils/colors';
import { Ribbon } from './Ribbon';

export interface BadgeProps {
  count?: React.ReactNode;
  showZero?: boolean;
  overflowCount?: number;
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  className?: string;
  status?: PresetStatusColorType;
  color?: LiteralUnion<PresetColorType, string>;
  text?: React.ReactNode;
  size?: 'default' | 'small';
  offset?: [number | string, number | string];
  title?: string;
  children?: React.ReactNode;
}
interface CompoundedComponent extends React.FC<BadgeProps> {
  Ribbon: typeof Ribbon;
}
const Badge: CompoundedComponent = ({
  prefixCls: customizePrefixCls,
  scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
  children,
  status,
  text,
  color,
  count = null,
  overflowCount = 99,
  dot = false,
  size = 'default',
  title,
  offset,
  style,
  className,
  showZero = false,
  ...restProps
}) => {
  // getPrefixCls 得到类前缀的函数
  // direction 方向
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  return <div>Badfge</div>;
};
Badge.Ribbon = Ribbon;
export { Badge };
