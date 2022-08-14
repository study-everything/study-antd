import React from 'react';
import type { LiteralUnion, ElementOf } from '@study/util';
import { Wave, tuple } from '@study/util';

import classnames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import ConfigContext from './Context';

// 内置颜色
export const PresetColorTypes = tuple(
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
);

export type PresetColorType = ElementOf<typeof PresetColorTypes>;

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  className?: string;
  color?: LiteralUnion<PresetColorType | PresetColorType, string>;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  visible?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

export const PresetStatusColorTypes = tuple('success', 'processing', 'error', 'default', 'warning');

// 匹配内置颜色正则
const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);
const PresetStatusColorRegex = new RegExp(`^(${PresetStatusColorTypes.join('|')})$`);

export const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  {
    prefixCls: customizePrefixCls = 'ant-tag',
    className,
    style,
    children,
    icon,
    color,
    onClose,
    closeIcon,
    closable = false,
    ...props
  },
  ref,
) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const [visible, setVisible] = React.useState(true);

  // 控制显隐藏
  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible!);
    }
  }, [props.visible]);

  const isPresetColor = (): boolean => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color);
  };

  const presetColor = isPresetColor();
  const prefixCls = getPrefixCls('tag', customizePrefixCls);

  const tagClassName = classnames(
    customizePrefixCls,
    {
      [`${prefixCls}-${color}`]: presetColor,
      [`${prefixCls}-has-color`]: color && !presetColor,
      [`${prefixCls}-hidden`]: !visible,
    },
    className,
  );

  // 关闭事件
  const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);

    if (e.defaultPrevented) {
      return;
    }
    if (!('visible' in props)) {
      setVisible(false);
    }
  };

  // 渲染关闭图标
  const renderCloseIcon = () => {
    if (closable) {
      return closeIcon ? (
        <span className={`${prefixCls}-close-icon`} onClick={handleCloseClick}>
          {closeIcon}
        </span>
      ) : (
        <CloseOutlined className={`${prefixCls}-close-icon`} onClick={handleCloseClick} />
      );
    }
    return null;
  };

  const isNeedWave =
    'onClick' in props || (children && (children as React.ReactElement<any>).type === 'a');

  const iconNode = icon || null;
  
  // 是否有自定义icon
  const kids = iconNode ? (
    <>
      {iconNode}
      <span>{children}</span>
    </>
  ) : (
    children
  );

  const tagStyle = {
    backgroundColor: color && !isPresetColor() ? color : undefined,
    ...style,
  };

  const tagNode = (
    <span {...props} ref={ref} className={tagClassName} style={tagStyle}>
      {kids}
      {renderCloseIcon()}
    </span>
  );

  return isNeedWave ? <Wave>{tagNode}</Wave> : tagNode;
};

const Tag = React.forwardRef<unknown, TagProps>(InternalTag);

export default Tag;
