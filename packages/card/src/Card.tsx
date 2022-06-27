import React from 'react';
import { getPrefixCls } from './utils';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import omit from 'omit.js';

export type CardSize = 'default' | 'small';

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode[];
  prefixCls?: string;
  className?: string;
  loading?: boolean;
  bordered?: boolean;
  style?: React.CSSProperties;
  size?: CardSize;
}

function getAction(actions: React.ReactNode[]) {
  return actions.map((action, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
      <span>{action}</span>
    </li>
  ));
}

export const Card: React.FC<CardProps> = (props) => {

  const {
    title,
    extra,
    actions,
    children,
    loading,
    bordered = true,
    className,
    size = 'default',
    prefixCls: customizePrefixCls = 'ant-card',
    ...others
  } = props;
  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-${size}`]: size !== 'default',
  });
  const loadingBlock = (
    <div className={`${prefixCls}-loading-content`}>
      <Row gutter={8}>
        <Col span={22}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
        <Col span={15}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
        <Col span={18}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={13}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
        <Col span={9}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
        <Col span={3}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
        <Col span={16}>
          <div className={`${prefixCls}-loading-block`} />
        </Col>
      </Row>
    </div>
  );

  let head;

  if (title || extra) {
    head = <div className={`${prefixCls}-head`}>
      <div className={`${prefixCls}-head-wrapper`}>
        {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
        {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      </div>
    </div>;
  }

  const body = (
    <div className={`${prefixCls}-body`}>
      {loading ? loadingBlock : children}
    </div>
  );
  const actionDom =
    actions && actions.length ? (
      <ul className={`${prefixCls}-actions`}>{getAction(actions)}</ul>
    ) : null;

  const divProps = omit(others, []);

  const render = <div {...divProps} className={classString}>
    {head}
    {body}
    {actionDom}
  </div>;

  return <div>{render}</div>;
};
