import React, { useState } from 'react';
import { ConfigConsumer } from 'antd/lib/config-provider';
import ResizeObserver from 'rc-resize-observer';
import { Avatar, Space } from 'antd';
import type { AvatarProps } from 'antd/lib/avatar';
import type { BreadcrumbProps } from 'antd/lib/breadcrumb';
import type Breadcrumb from 'antd/lib/breadcrumb';
import type { TagType } from 'antd/lib/tag';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import TransButton from 'antd/lib/_util/transButton';
// import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';

import classNames from 'classnames';

export interface PageHeaderProps {
  backIcon?: React.ReactNode;
  prefixCls?: string;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
  breadcrumb?: BreadcrumbProps | React.ReactElement<typeof Breadcrumb>;
  breadcrumbRender?: (props: PageHeaderProps, defaultDom: React.ReactNode) => React.ReactNode;
  tags?: React.ReactElement<TagType> | React.ReactElement<TagType>[];
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  avatar?: AvatarProps;
  onBack?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  ghost?: boolean;
  children?: React.ReactNode;
}

// 返回图标
const getBackIcon = (props: PageHeaderProps) => {
  if (props.backIcon !== undefined) {
    return props.backIcon;
  }
  return <ArrowLeftOutlined />;
  // <ArrowRightOutlined />
};

// 返回按钮渲染
const renderBack = (prefixCls: string, backIcon?: React.ReactNode, onBack?: (e?: React.MouseEvent<HTMLDivElement>) => void) => {
  if (!backIcon || !onBack) {
    return null;
  }
  return (
    <LocaleReceiver componentName="PageHeader">
      {({ back }: { back: string }) => (
        <div className={`${prefixCls}-back`}>
          <TransButton
            onClick={(e?: React.MouseEvent<HTMLDivElement>) => {
              onBack?.(e);
            }}
            className={`${prefixCls}-back-button`}
            aria-label={back}>
            {backIcon}
          </TransButton>
        </div>
      )}
    </LocaleReceiver>
  );
};

// title 渲染
const renderTile = (prefixCls: string, props: PageHeaderProps) => {
  const { title, avatar, subTitle, tags, extra, onBack } = props;

  const hasHeading = title || subTitle || tags || extra;

  if (!hasHeading) {
    return null;
  }

  const headingPrefixCls = `${prefixCls}-heading`;

  const backIcon = getBackIcon(props);

  const backIconDom = renderBack(prefixCls, backIcon, onBack);

  const hasTitle = backIconDom || avatar || hasHeading;
  return (
    <div className={headingPrefixCls}>
      {hasTitle && (
        <div className={`${headingPrefixCls}-left`}>
          {backIconDom}
          {avatar && <Avatar {...avatar} />}
          {title && (
            <span className={`${headingPrefixCls}-title`} title={typeof title === 'string' ? title : undefined}>
              {title}
            </span>
          )}
          {subTitle && (
            <span className={`${headingPrefixCls}-sub-title`} title={typeof subTitle === 'string' ? subTitle : undefined}>
              {subTitle}
            </span>
          )}
          {tags && <span className={`${headingPrefixCls}-tags`}>{tags}</span>}
        </div>
      )}
      {extra && (
        <span className={`${headingPrefixCls}-extra`}>
          <Space>{extra}</Space>
        </span>
      )}
    </div>
  );
};

const renderChildren = (prefixCls: string, children: React.ReactNode) => <div className={`${prefixCls}-content`}>{children}</div>;

const renderFooter = (prefixCls: string, footer: React.ReactNode) => {
  if (footer) {
    return <div className={`${prefixCls}-footer`}>{footer}</div>;
  }
  return null;
};

// TODO: 没实现面包屑,因为引入就好
export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const [compact, updateCompact] = useState(false);

  const onResize = ({ width }: { width: number }) => {
    updateCompact(width < 768);
  };

  return (
    <ConfigConsumer>
      {({ getPrefixCls, direction }) => {
        const { prefixCls: customizePrefixCls, style, footer, children, className: customizeClassName } = props;

        const prefixCls = getPrefixCls('page-header', customizePrefixCls);

        const className = classNames(prefixCls, customizeClassName, {
          // 'has-breadcrumb': !!breadcrumbDom,
          'has-footer': !!footer,
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-compact`]: compact,
        });

        return (
          <ResizeObserver onResize={onResize}>
            <div className={className} style={style}>
              {renderTile(prefixCls, props)}
              {children && renderChildren(prefixCls, children)}
              {renderFooter(prefixCls, footer)}
            </div>
          </ResizeObserver>
        );
      }}
    </ConfigConsumer>
  );
};
