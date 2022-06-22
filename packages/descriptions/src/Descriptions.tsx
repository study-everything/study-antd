import React, { useContext, useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import ResponsiveObserve from '@study/util/esm/responsiveObserve';
import { ConfigContext } from 'antd/es/config-provider';
import { DescriptionsContext } from './contexts';
import Row from './Row';
import DescriptionsItem from './Item';
import { DEFAULT_COLUMN_MAP } from './constants/index';
import { getColumns, getRows } from './utils/index';

import type { Breakpoint, ScreenMap } from '@study/util/esm/responsiveObserve';
import type { DescriptionsContextProps } from './contexts';

export interface DescriptionsProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
  size?: 'middle' | 'small' | 'default';
  children?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  column?: number | Partial<Record<Breakpoint, number>>;
  layout?: 'horizontal' | 'vertical';
  colon?: boolean;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export const Descriptions: React.FC<DescriptionsProps> & { Item: typeof DescriptionsItem } = ({
  prefixCls: customizePrefixCls,
  title,
  extra,
  column = DEFAULT_COLUMN_MAP,
  colon = true,
  bordered,
  layout,
  children,
  className,
  style,
  size,
  labelStyle,
  contentStyle,
}) => {
  const { getPrefixCls, direction } = useContext(ConfigContext);
  const [screens, setScreens] = useState<ScreenMap>({});

  useEffect(
    () => {
      // 判断当前视口宽度在哪个断点内
      // {
      //   lg: false
      //   md: true
      //   sm: true
      //   xl: false
      //   xs: false
      //   xxl: false
      // }
      const subscribeToken = ResponsiveObserve.subscribe((newScreens) => {
        // 列数不为对象时无需重置断点对象
        if (typeof column !== 'object') {
          return;
        }

        setScreens(newScreens);
      });

      return () => {
        ResponsiveObserve.unsubscribe(subscribeToken);
      };
    },
    [],
  );

  // 省流样式
  const contextValue = useMemo<DescriptionsContextProps>(
    () => {
      return { labelStyle, contentStyle };
    },
    [labelStyle, contentStyle],
  );

  // 前缀不可缺
  const prefixCls = getPrefixCls('descriptions', customizePrefixCls);

  // 处理儿子们
  const mergedColumn = getColumns(column, screens);
  const rows = getRows(children, mergedColumn);

  return (
    <DescriptionsContext.Provider value={contextValue}>
      <div
        className={classNames(
          prefixCls,
          {
            [`${prefixCls}-${size}`]: size && size !== 'default',
            [`${prefixCls}-bordered`]: !!bordered,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          },
          className
        )}
        style={style}
      >
        {(title || extra) && (
          <div className={`${prefixCls}-header`}>
            {title && <div className={`${prefixCls}-title`}>{title}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
          </div>
        )}
        <div className={`${prefixCls}-view`}>
          <table>
            <tbody>
              {rows.map((item, index) => {
                return (
                  <Row
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    index={index}
                    prefixCls={prefixCls}
                    row={item}
                    bordered={bordered}
                    vertical={layout === 'vertical'}
                    colon={colon}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DescriptionsContext.Provider>
  );
};

Descriptions.Item = DescriptionsItem;
Descriptions.displayName = 'Descriptions';
