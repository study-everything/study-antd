import RcImage, { ImageProps } from 'rc-image';
import * as React from 'react';
import PreviewGroup from './PreviewGroup';

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

export const Image: CompositionImage<ImageProps> = ({ prefixCls, preview, ...otherProps }) => 
  // 属性均为 rc-image的属性 ant-design 未添加新功能。具体 prefixCls preview 写法参照 rc-image
  // const { alt, fallback, height, placeholder, src, width, onError, rootClassNam } = otherProps;
   <RcImage preview={preview} prefixCls={prefixCls} {...otherProps} />
;

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

export default Image;
