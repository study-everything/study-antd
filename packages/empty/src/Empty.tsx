import React from 'react';
import DefaultImage from './defaultImg';
import SimpleImage from './simpleImg';
import classNames from 'classnames';
import { getPrefixCls, direction } from './utils';

const defaultEmptyImg = <DefaultImage />;
const simpleEmptyImg = <SimpleImage />;

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  description?: React.ReactNode;
  image?: React.ReactNode;
  imageStyle?: React.ReactNode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface EmptyType extends React.FC<EmptyProps> {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
}

export const Empty: EmptyType = (props: EmptyProps) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    description,
    children,
    image = defaultEmptyImg,
    imageStyle,
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('empty', customizePrefixCls);
  const des = typeof description !== 'undefined' ? description : '暂无数据';
  const alt = typeof des === 'string' ? des : 'empty';
  let imageNode: React.ReactNode = null;
  if (typeof image === 'string') {
    imageNode = <img alt={alt} src={image} />;
  } else {
    imageNode = image;
  }
  return (
    <div
      className={classNames(
        prefixCls,
        {
          [`${prefixCls}-normal`]: image === simpleEmptyImg,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      )}
      {...restProps}
    >
      <div className={`${prefixCls}-image`} style={imageStyle}>
        {imageNode}
      </div>
      {des && <div className={`${prefixCls}-description`}>{des}</div>}
      {children && <div className={`${prefixCls}-footer`}>{children}</div>}
    </div>
  );
};

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
