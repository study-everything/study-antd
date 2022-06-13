import React from 'react'
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import Element from './Element';
import type {SkeletonElementProps} from './Element'

export interface SkeletonInputProps extends Omit<SkeletonElementProps, 'size'|'shape'> {
  size?: 'large' | 'small' | 'default';
  block?:boolean;
}

const SkeletonInput = (props:SkeletonInputProps)=>{
  const {prefixCls='ant-skeleton',className,active,block}=props;
  // omit 从对象上剔除某些属性
  const otherProps = omit(props,['prefixCls'])
  
  const cls=classNames(prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]:active,
      [`${prefixCls}-block`]:block,
    },
    className,);
  return (
    <div className={cls}>
      <Element prefixCls={`${prefixCls}-input`} {...otherProps} />
    </div>
  )
}

SkeletonInput.defaultProps={
  size:'default',
}

export default SkeletonInput;