// 用来做自定义 Icon
// 自定义 SVG 图标 
// 自定义 font 图标 ->createFromIconfontCN 

import * as React from 'react';
import classNames from 'classnames';
import Context from './Context';
import { svgBaseProps, useInsertStyles, warning} from '../utils';

export interface IconBaseProps extends React.HTMLProps<HTMLSpanElement>{
  spin?: boolean; // 是否有旋转动画
  rotate?: number; // 图标旋转角度（IE9 无效）
}

export interface CustomIconComponentProps {
  width: string | number; // svg 元素宽度
  height: string | number;
  fill: string; // svg 元素填充的颜色
  viewBox?: string;
  className?: string; // 设置图标的样式名
  style?: React.CSSProperties; // 设置图标的样式，例如 fontSize 和 color
}


// 自定义Icon
export interface IconComponentProps extends IconBaseProps{
  viewBox?: string;
  component?: React.ComponentType<CustomIconComponentProps 
  | React.SVGProps<SVGSVGElement>> 
  | React.ForwardRefExoticComponent<CustomIconComponentProps>;
  ariaLabel?: React.AriaAttributes['aria-label'];
}

// React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中
// 转发 refs 到 DOM 组件
// 在高阶组件中转发 refs
const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>((props, ref) =>{

  const {
    className,

    component: Component,
    viewBox,
    spin,
    rotate,

    tabIndex,
    onClick,

    children,
    ...restProps
  } = props

  // 如果传入得不是组件
  warning(
    Boolean(Component || children),
    'Should have `component` prop or `children`.',
  );

  useInsertStyles(); // 样式

  // 设置图标的样式
  const { prefixCls = 'anticon' } = React.useContext(Context);
  const classString = classNames(
    prefixCls,
    className,
  );

  // 设置svg的样式  anticon-spin
  const svgClassString = classNames({
    [`${prefixCls}-spin`]: !!spin,
  });

  const svgStyle = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`,
      }
    : undefined;

  const innerSvgProps: CustomIconComponentProps = {
    ...svgBaseProps,
    className: svgClassString,
    style: svgStyle,
    viewBox,
  };

  if (!viewBox) {
    delete innerSvgProps.viewBox;
  }

   // component > children
   const renderInnerNode = ()=>{
    if(Component){
      return <Component {...innerSvgProps}>{children}</Component>
    }

    if(children){
      warning(
        Boolean(viewBox) ||
          (React.Children.count(children) === 1 &&
            React.isValidElement(children) &&
            React.Children.only(children).type === 'use'),
        'Make sure that you provide correct `viewBox`' +
        ' prop (default `0 0 1024 1024`) to the icon.',
      );
      return (
        <svg {...innerSvgProps} viewBox={viewBox}>
          {children}
        </svg>
      );
    }
    return null;
   }
  
   let iconTabIndex = tabIndex;
   if (iconTabIndex === undefined && onClick) {
     iconTabIndex = -1;
   }

   return (
     <span 
      role="img"
      {...restProps}
      ref={ref}
      tabIndex={iconTabIndex}
      onClick={onClick}
      className={classString}
     >
       {renderInnerNode()}
     </span>
   )
})

Icon.displayName = 'StudyIcon'
export default Icon;