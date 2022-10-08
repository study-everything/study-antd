/* 
功能设计：
- allowClear/handleReset 清除按钮
- prefix/suffix 前后缀
- addonBefore/addonAfter 前后标签
- inputElement：clone传入的基础组件(inputElement)，可能是input,textarea
- 样式相关：className,style,affixWrapperClassName,groupClassName,wrapperClassName
- disabled 是否禁用
- readOnly 只读
- focused 是否选中
- triggerFocus Input组件在focus时，设置光标的位置，以及选中内容，主要通过原生api setSelectionRange实现
- value input的值
- hidden 是否隐藏组件(实际使用的时候，感觉基本用不上)

内部需求：
- prefixCls：统一的class前缀 
*/
import type { FC, ReactElement, MouseEventHandler } from 'react';
import React, { cloneElement, useRef } from 'react';
import classNames from 'classnames';
import type { BaseInputProps } from './interface';
import { hasAddon, hasPrefixSuffix } from './utils';

const BaseInput: FC<BaseInputProps> = props => {
  const {
    inputElement,
    value,
    hidden,
    allowClear,
    disabled,
    readOnly,
    handleReset,
    prefixCls,
    prefix,
    suffix,
    focused,
    className,
    affixWrapperClassName,
    style,
    triggerFocus,
    wrapperClassName,
    groupClassName,
    addonBefore,
    addonAfter,
  } = props;
  const containerRef = useRef<HTMLSpanElement>(null);
  let element: ReactElement = cloneElement(inputElement, {
    // 克隆基础组件，并添加value和hidden属性
    value,
    hidden,
  });
  const onInputMouseDown: MouseEventHandler = () => containerRef.current && triggerFocus?.();

  // const onInputMouseDown: React.MouseEventHandler = (e) => {
  //   if (containerRef.current?.contains(e.target as Element)) {//不太理解这里为何要判断这个contains
  //     triggerFocus?.();
  //   }
  // };

  const getClearIcon = () => {
    if (!allowClear) return null;
    const needClear = !!value && !disabled && !readOnly;
    const clearIconCls = `${prefixCls}-clear-icon`;
    return (
      <span
        onClick={handleReset}
        className={classNames(clearIconCls, {
          [`${clearIconCls}-hidden`]: !needClear,
          [`${clearIconCls}-has-suffix`]: !!suffix,
        })}
      >
        {typeof allowClear === 'object' && allowClear?.clearIcon ? allowClear.clearIcon : '✖'}
      </span>
    );
  };

  // 处理前后缀逻辑，这里不能用return因为后续还有标签逻辑，所以用重写element的逻辑
  if (hasPrefixSuffix(props)) {
    // class处理
    const affixWrapperPrefixCls = `${prefixCls}-affix-wrapper`;
    const affixWrapperCls = classNames(
      affixWrapperPrefixCls,
      {
        [`${affixWrapperPrefixCls}-disabled`]: disabled,
        [`${affixWrapperPrefixCls}-focused`]: focused,
        [`${affixWrapperPrefixCls}-readonly`]: readOnly,
        [`${affixWrapperPrefixCls}-input-with-clear-btn`]: suffix && allowClear && value,
      },
      !hasAddon(props) && className,
      affixWrapperClassName,
    );
    // 后缀处理，要考虑clearIcon相关逻辑
    const suffixNode = (suffix || allowClear) && (
      <span>
        {getClearIcon()}
        {suffix}
      </span>
    );
    // 这里不能直接return，而是修改element,因为后面还有一个前后标签的逻辑
    element = (
      <span
        // 样式的处理都挪到包裹的span标签上
        className={affixWrapperCls}
        style={style}
        hidden={!hasAddon(props) && hidden}
        // span触发mouseDown时，要使input处于focus状态
        onMouseDown={onInputMouseDown}
        ref={containerRef}
      >
        {prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}
        {cloneElement(inputElement, {
          style: null,
          value,
          hidden: null,
        })}
        {suffixNode}
      </span>
    );
  }

  // 处理标签，可以直接用return,因为已经没有后续逻辑了
  if (hasAddon(props)) {
    // 主要是样式相关处理，不太清楚具体设计逻辑
    const wrapperCls = `${prefixCls}-group`;
    const addonCls = `${wrapperCls}-addon`;

    const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, wrapperCls, wrapperClassName);

    const mergedGroupClassName = classNames(
      `${prefixCls}-group-wrapper`,
      className,
      groupClassName,
    );

    return (
      <span className={mergedGroupClassName} style={style} hidden={hidden}>
        <span className={mergedWrapperClassName}>
          {addonBefore && <span className={addonCls}>{addonBefore}</span>}
          {cloneElement(element, { style: null, hidden: null })}
          {addonAfter && <span className={addonCls}>{addonAfter}</span>}
        </span>
      </span>
    );
  }

  return element;
};

export default BaseInput;
