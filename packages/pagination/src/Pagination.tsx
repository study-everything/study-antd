import React from 'react';
import DoubleLeftOutlined from '@ant-design/icons/DoubleLeftOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import classNames from 'classnames';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import { ConfigContext } from 'antd/lib/config-provider';
import type { PaginationProps as RcPaginationProps } from 'rc-pagination';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import RcPagination from 'rc-pagination';
import { MiddleSelect, MiniSelect } from './Select';

export interface PaginationProps extends RcPaginationProps {
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  size?: 'default' | 'small';
  responsive?: boolean;
  role?: string;
  totalBoundaryShowSizeChanger?: number;
}

export type PaginationPosition = 'top' | 'bottom' | 'both';

export interface PaginationConfig extends PaginationProps {
  position?: PaginationPosition;
}

export const Pagination: React.FC<PaginationProps> = ({
  prefixCls: customizePrefixCls,
  selectPrefixCls: customizeSelectPrefixCls,
  className,
  size,
  locale: customLocale,
  selectComponentClass,
  responsive,
  showSizeChanger,
  ...restProps
}) => {
  const { xs } = useBreakpoint(responsive);

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('pagination', customizePrefixCls);

  const mergedShowSizeChanger = showSizeChanger;

  const getIconsProps = () => {
    const ellipsis = <span className={`${prefixCls}-item-ellipsis`}>•••</span>;
    let prevIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        <LeftOutlined />
      </button>
    );
    let nextIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        <RightOutlined />
      </button>
    );
    let jumpPrevIcon = (
      <a className={`${prefixCls}-item-link`}>
        <div className={`${prefixCls}-item-container`}>
          <DoubleLeftOutlined className={`${prefixCls}-item-link-icon`} />
          {ellipsis}
        </div>
      </a>
    );
    let jumpNextIcon = (
      <a className={`${prefixCls}-item-link`}>
        <div className={`${prefixCls}-item-container`}>
          <DoubleRightOutlined className={`${prefixCls}-item-link-icon`} />
          {ellipsis}
        </div>
      </a>
    );

    if (direction === 'rtl') {
      [prevIcon, nextIcon] = [nextIcon, prevIcon];
      [jumpPrevIcon, jumpNextIcon] = [jumpNextIcon, jumpPrevIcon];
    }
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon,
    };
  };

  return (
    <LocaleReceiver componentName="Pagination">
      {(contextLocale) => {
        const locale = { ...contextLocale, ...customLocale };
        const isSmall = size === 'small' || !!(xs && !size && responsive);
        const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);
        const extendedClassName = classNames(
          {
            [`${prefixCls}-mini`]: isSmall,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          },
          className
        );

        return (
          <RcPagination
            {...getIconsProps()}
            {...restProps}
            prefixCls={prefixCls}
            selectPrefixCls={selectPrefixCls}
            className={extendedClassName}
            selectComponentClass={selectComponentClass || (isSmall ? MiniSelect : MiddleSelect)}
            locale={locale}
            showSizeChanger={mergedShowSizeChanger}
          />
        );
      }}
    </LocaleReceiver>
  );
};
