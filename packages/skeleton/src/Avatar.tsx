import React from 'react'
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import Element from './Element';
import type {SkeletonElementProps} from './Element'

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}

const SkeletonAvatar = (props:AvatarProps)=>{
  const {prefixCls='ant-skeleton',className,active}=props;
  // omit 从对象上剔除某些属性
  const otherProps = omit(props,['prefixCls','className'])
  
  const cls=classNames(prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]:active,
    },
    className,);
  return (
    <div className={cls}>
      <Element prefixCls={`${prefixCls}-avatar`} {...otherProps} />
    </div>
  )
}

SkeletonAvatar.defaultProps={
  size:'default',
  shape:'circle'
}

export default SkeletonAvatar;