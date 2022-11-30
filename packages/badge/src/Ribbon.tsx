import classNames from 'classnames';
import * as React from 'react';
import type { LiteralUnion } from '@study/util';
import { ConfigContext } from './config-provider';
import { isPresetColor } from './utils';
import type { PresetColorType } from './utils/colors';

type RibbonPlacement = 'start' | 'end';

export interface RibbonProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  text?: React.ReactNode;
  color?: LiteralUnion<PresetColorType, string>;
  children?: React.ReactNode;
  placement?: RibbonPlacement;
}

export const Ribbon: React.FC<RibbonProps> = ({
  className,
  prefixCls: customizePrefixCls,
  style,
  color,
  children,
  text,
  placement = 'end',
}) => {
  // getPrefixCls 得到类前缀的函数
  // direction 方向
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  // 得到样式类型前缀
  const prefixCls = getPrefixCls('ribbon', customizePrefixCls);

  // 预设颜色
  const colorInPreset = isPresetColor(color);

  // 配置样式
  const ribbonCls = classNames(
    prefixCls,
    `${prefixCls}-placement-${placement}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-color-${color}`]: colorInPreset,
    },
    className,
  );
  const colorStyle: React.CSSProperties = {};
  const cornerColorStyle: React.CSSProperties = {};
  if (color && !colorInPreset) {
    // 绸缎背景颜色
    colorStyle.background = color;
    // 三角形颜色
    cornerColorStyle.color = color;
  }
  return (
    <div className={`${prefixCls}-wrapper`}>
      {children}
      {/* 绸带的layout position background cornerColor */}
      <div className={ribbonCls} style={{ ...colorStyle, ...style }}>
        <span className={`${prefixCls}-text`}>{text}</span>
        <div className={`${prefixCls}-corner`} style={cornerColorStyle} />
      </div>
    </div>
  );
};
