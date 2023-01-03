import React from 'react';
import omit from 'rc-util/lib/omit';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';
import type { SizeType } from '../SizeContext';
import SizeContext from '../SizeContext';
import DisabledContext from '../DisabledContext';
import { tuple } from './utils/type';
import { cloneElement } from './utils/reactNode';
import Group, { GroupSizeContext } from './button-group';
import LoadingIcon from './LoadingIcon';
import Wave from './utils/wave';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str: any) {
  return typeof str === 'string';
}

function isUnBorderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

function isReactFragment(node: React.ReactNode) {
  return React.isValidElement(node) && node.type === React.Fragment;
}

function insertSpace(child: React.ReactChild, needInserted: boolean) {
  if (child === null || child === undefined) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children) // 两个中文字符
  ) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE),
    });
  }
  if (typeof child === 'string') {
    return isTwoCNChar(child) ? <span>{child.split('').join(SPACE)}</span> : <span>{child}</span>;
  }
  if (isReactFragment(child)) {
    return <span>{child}</span>;
  }
  return child;
}

function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure: boolean = false;
  const childList: React.ReactNode[] = [];
  React.Children.forEach(children, child => {
    const type = typeof child;
    // 把连续的字符串子节点合并成一个
    const isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  });

  return React.Children.map(childList, child =>
    // 插入 space
    insertSpace(child as React.ReactChild, needInserted),
  );
}

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];
const ButtonShapes = tuple('default', 'circle', 'round');
export type ButtonShape = typeof ButtonShapes[number];
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: React.ReactNode;
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
type Loading = number | boolean;

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    loading = false, // 加载中
    prefixCls: customizePrefixCls, // 类前缀
    type = 'default', // 按钮类型 default circle round
    danger,
    shape = 'default',
    size: customizeSize, // 自定义的 button 尺寸大小
    disabled: customDisabled, // 自定义是否禁用
    className, // 自定义类名
    children, // 子
    icon, // 图标
    ghost = false, // 是否启用 ghost
    block = false, // 自适应父容器
    htmlType = 'button' as ButtonProps['htmlType'], // html 原声的 type 属性
    ...rest
  } = props;

  // 按钮的加载状态判断
  const [innerLoading, setLoading] = React.useState<Loading>(!!loading);
  // 是否是有两个中文字符
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  // 设置按钮的 禁用状态
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled || disabled;

  // button 基础大小设置
  const size = React.useContext(SizeContext);
  // button 组合的大小
  const groupSize = React.useContext(GroupSizeContext);

  // 有唯一子节点，并且不是 icon ，不是 文本和连接按钮 才添加space
  const isNeedInserted = () =>
    React.Children.count(children) === 1 && !icon && !isUnBorderedButtonType(type);

  // getPrefixCls 得到类前缀的函数
  // autoInsertSpaceInButton 是否要在button添加space
  // direction 方向
  const { getPrefixCls, autoInsertSpaceInButton, direction } = React.useContext(ConfigContext);

  // 得到样式类型前缀
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  // 是否要在button添加space
  const autoInsertSpace = autoInsertSpaceInButton !== false;

  // button 大小类型后缀
  const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
  // 配置 buton 大小
  const sizeFullname = groupSize || customizeSize || size;
  // 根据设置的大小 得到类后缀
  const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';

  // 如果处于加载状态使用 loading 图标，否则使用传递的图标
  const iconType = innerLoading ? 'loading' : icon;
  const linkButtonRestProps = omit(rest as AnchorButtonProps & { navigate: any }, ['navigate']);

  // 配置样式
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${shape}`]: shape !== 'default' && shape, // Note: Shape also has `default`
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType, // 只有 icon 存在的 button
      [`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonType(type), // 除掉 link text 类型的button
      [`${prefixCls}-loading`]: innerLoading, // 处于加载状态的类样式
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace && !innerLoading,
      [`${prefixCls}-block`]: block, // 宽度自适应父元素 width 100%
      [`${prefixCls}-dangerous`]: !!danger, // 危险色系
      [`${prefixCls}-rtl`]: direction === 'rtl', // dom 元素方向属性设置
      [`${prefixCls}-disabled`]: linkButtonRestProps.href !== undefined && mergedDisabled,
    },
    className,
  );

  const fixTwoCNChar = () => {
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    const buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };

  // TODO:以下 处理loading   事件点击
  const loadingOrDelay: Loading = typeof loading === 'boolean' ? loading : loading?.delay || true;

  // 定时器处理
  React.useEffect(() => {
    let delayTimer: number | null = null;

    if (typeof loadingOrDelay === 'number') {
      delayTimer = window.setTimeout(() => {
        console.clear();
        console.log('定时器中的。。。。。。。');
        delayTimer = null;
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }

    return () => {
      if (delayTimer) {
        window.clearTimeout(delayTimer);
        delayTimer = null;
      }
    };
  }, [loadingOrDelay]);

  React.useEffect(fixTwoCNChar, [buttonRef]);

  // 点击事件处理
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    if (innerLoading || mergedDisabled) {
      // 加载状态阻止点击时间，并且防止冒泡
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };
  // TODO 以上

  const iconNode =
    icon && !innerLoading ? (
      icon
    ) : (
      <LoadingIcon existIcon={!!icon} prefixCls={prefixCls} loading={!!innerLoading} />
    );

  // button子元素是两个中文字符时添加空格（autoInsertSpace 控制）
  const kids =
    children || children === 0
      ? spaceChildren(children, isNeedInserted() && autoInsertSpace)
      : null;

  // 链接按钮
  // 判断是否有 href 参数 如果有 那么改成链接
  if (linkButtonRestProps.href !== undefined) {
    return (
      <a {...linkButtonRestProps} className={classes} onClick={handleClick} ref={buttonRef}>
        {iconNode}
        {kids}
      </a>
    );
  }

  const buttonNode = (
    <button
      {...(rest as NativeButtonProps)}
      type={htmlType} // html 原声的 type 属性
      className={classes}
      ref={buttonRef}
      onClick={handleClick}
      disabled={mergedDisabled}
    >
      {iconNode}
      {kids}
    </button>
  );

  // 无边框按钮
  if (isUnBorderedButtonType(type)) {
    return buttonNode;
  }

  // 普通有边框按钮
  return <Wave disabled={!!innerLoading}>{buttonNode}</Wave>;
};

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
  __ANT_BUTTON: boolean;
}

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent;

Button.Group = Group;

export { Button };
