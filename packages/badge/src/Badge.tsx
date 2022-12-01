import React, { useMemo } from 'react';

import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { cloneElement } from '@study/util';
import type { LiteralUnion } from '@study/util';
import { isPresetColor } from './utils';

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
  const prefixCls = getPrefixCls('badge', customizePrefixCls);

  // count 展示的数字，超过 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏
  const numberedDisplayCount = (
    (count as number) > (overflowCount as number) ? `${overflowCount}+` : count
  ) as string | number | null;

  // 判断count是否为0
  const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0;

  //
  const ignoreCount = count === null || isZero;

  //  status 或者 color 有值
  const hasStatus = (status || color) && ignoreCount;

  const showAsDot = dot && !isZero;

  // 展示 dot 或者 count
  const mergedCount = showAsDot ? '' : numberedDisplayCount;

  // 隐藏展示徽标
  const isHidden = useMemo(() => {
    const isEmpty = mergedCount === null || mergedCount === undefined || mergedCount === '';
    return (isEmpty || (isZero && !showZero)) && !showAsDot;
  }, [mergedCount, isZero, showZero, showAsDot]);

  // 计算合并样式
  const mergedStyle = useMemo<React.CSSProperties>(() => {
    if (!offset) {
      return { ...style };
    }

    const offsetStyle: React.CSSProperties = { marginTop: offset[1] };
    if (direction === 'rtl') {
      offsetStyle.left = parseInt(offset[0] as string, 10);
    } else {
      offsetStyle.right = -parseInt(offset[0] as string, 10);
    }

    return {
      ...offsetStyle,
      ...style,
    };
  }, [direction, offset, style]);

  // Shared styles
  const statusCls = classNames({
    [`${prefixCls}-status-dot`]: hasStatus,
    [`${prefixCls}-status-${status}`]: !!status,
    [`${prefixCls}-status-${color}`]: isPresetColor(color),
  });

  const statusStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    statusStyle.background = color;
  }

  const badgeClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-status`]: hasStatus,
      [`${prefixCls}-not-a-wrapper`]: !children,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  // >>> Status Text
  const statusTextNode =
    isHidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;

  // >>> Display Component
  const displayNode =
    !count || typeof count !== 'object'
      ? undefined
      : cloneElement(count, oriProps => ({
          style: {
            ...mergedStyle,
            ...oriProps.style,
          },
        }));

  // 无子节点 eg: <Badge status="success" />
  if (!children && hasStatus) {
    const statusTextColor = mergedStyle.color;
    return (
      <span {...restProps} className={badgeClassName} style={mergedStyle}>
        <span className={statusCls} style={statusStyle} />
        {text && (
          <span style={{ color: statusTextColor }} className={`${prefixCls}-status-text`}>
            {text}
          </span>
        )}
      </span>
    );
  }
  // 有子节点的 eg：<Badge status="success" count={<Icon type="xxx" />}></Badge>
  return (
    <span {...restProps} className={badgeClassName}>
      {children}
      <CSSMotion
        visible={!isHidden}
        motionName={`${prefixCls}-zoom`}
        motionAppear={false}
        motionDeadline={1000}
      >
        {({ className: motionClassName }) => {
          const scrollNumberPrefixCls = getPrefixCls(
            'scroll-number',
            customizeScrollNumberPrefixCls,
          );

          const isDot = showAsDot;

          const scrollNumberCls = classNames({
            [`${prefixCls}-dot`]: isDot,
            [`${prefixCls}-count`]: !isDot,
            [`${prefixCls}-count-sm`]: size === 'small',
            [`${prefixCls}-multiple-words`]:
              !isDot && mergedCount && mergedCount.toString().length > 1,
            [`${prefixCls}-status-${status}`]: !!status,
            [`${prefixCls}-status-${color}`]: isPresetColor(color),
          });

          let scrollNumberStyle: React.CSSProperties = { ...mergedStyle };
          if (color && !isPresetColor(color)) {
            scrollNumberStyle = scrollNumberStyle || {};
            scrollNumberStyle.background = color;
          }

          const scrollPrefixCls = getPrefixCls('scroll-number', scrollNumberPrefixCls);
          const newProps = {
            ...restProps,
            'data-show': !isHidden,
            style: scrollNumberStyle,
            className: classNames(scrollPrefixCls, scrollNumberCls, motionClassName),
            title: title as string,
          };

          const numberNodes: React.ReactNode = mergedCount;
          if (scrollNumberStyle && scrollNumberStyle.borderColor) {
            newProps.style = {
              ...scrollNumberStyle,
              boxShadow: `0 0 0 1px ${style.borderColor} inset`,
            };
          }
          if (displayNode) {
            return cloneElement(displayNode, oriProps => ({
              className: classNames(
                `${scrollPrefixCls}-custom-component`,
                oriProps?.className,
                motionClassName,
              ),
            }));
          }
          return React.createElement('sup', newProps, numberNodes);
        }}
      </CSSMotion>
      {statusTextNode}
    </span>
  );
};
Badge.Ribbon = Ribbon;
export { Badge };
