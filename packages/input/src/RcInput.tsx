import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import type { RcInputProps, InputRef, InputFocusOptions } from './interface';
import BaseInput from './BaseInput';
import { hasAddon, hasPrefixSuffix, fixControlledValue, triggerFocus } from './utils';
/* 
RcInput组件，在BaseInput的基础上继续完善
提供能力：
- value 管理，以及相关数据变化的监听
- focused 管理以及相关数据变好的监听
- ref管理以及暴露给父元素的ref 数据
- change事件
- keyDown事件
- focus事件
- blur事件
- reset方法
- getInputElement BaseInput组件需要的inputElement参数的处理
- getSuffix suffix的处理，主要是处理suffix和count
*/

const RcInput = forwardRef<InputRef, RcInputProps>((props, ref) => {
  const {
    defaultValue,
    value: pValue,
    disabled,
    onChange=()=>{},
    onPressEnter,
    onKeyDown,
    onFocus,
    onBlur,
    autoComplete,
    prefixCls,
    inputClassName,
    className,
    htmlSize,
    type = 'text',
    maxLength,
    suffix,
    showCount,
    ...rest
  } = props;
  const [value, setValue] = useState<string | number | readonly string[]>(
    pValue || defaultValue || undefined,
  );
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = (option?: InputFocusOptions) => {
    if (inputRef.current) {
      triggerFocus(inputRef.current, option);
    }
  };

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法和属性
    focus,
    blur: () => {
      inputRef.current?.blur();
    },
    setSelectionRange: (
      start: number,
      end: number,
      direction?: 'forward' | 'backward' | 'none',
    ) => {
      inputRef.current?.setSelectionRange(start, end, direction);
    },
    select: inputRef.current?.select,
    input: inputRef.current,
  }));

  // 监听disabled改变focused
  useEffect(() => {
    setFocused(prev => (prev && disabled ? false : prev));
  }, [disabled]);
  // 处理事件
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.value === undefined) {
      setValue(e.target.value);
    }
    onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && e.key === 'Enter') {
      onPressEnter(e);
    }
    onKeyDown?.(e);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setValue('');
    focus();
    onChange(e as any as React.ChangeEvent<HTMLInputElement>);
  };

  // 处理节点
  const getInputElement = () => {
    const otherProps = omit(props as RcInputProps, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
      'allowClear',
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      'defaultValue',
      'showCount',
      'affixWrapperClassName',
      'groupClassName',
      'inputClassName',
      'wrapperClassName',
      'htmlSize',
    ]);
    return (
      <input
        autoComplete={autoComplete}
        {...otherProps}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={classNames(
          prefixCls,
          {
            [`${prefixCls}-disabled`]: disabled,
          },
          inputClassName,
          !hasAddon(props) && !hasPrefixSuffix(props) && className,
        )}
        ref={inputRef}
        size={htmlSize}
        type={type}
      />
    );
  };

  const getSuffix = () => {
    const hasMaxLength = Number(maxLength) > 0;

    if (suffix || showCount) {
      const val = fixControlledValue(value);
      const valueLength = [...val].length;
      const dataCount =
        typeof showCount === 'object'
          ? showCount.formatter({ value: val, count: valueLength, maxLength })
          : `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`;

      return (
        <>
          {!!showCount && (
            <span
              className={classNames(`${prefixCls}-show-count-suffix`, {
                [`${prefixCls}-show-count-has-suffix`]: !!suffix,
              })}
            >
              {dataCount}
            </span>
          )}
          {suffix}
        </>
      );
    }
    return null;
  };

  return (
    <BaseInput
      {...rest}
      prefixCls={prefixCls}
      className={className}
      inputElement={getInputElement()}
      handleReset={handleReset}
      value={fixControlledValue(value)}
      focused={focused}
      triggerFocus={focus}
      suffix={getSuffix()}
      disabled={disabled}
    />
  );
});

export default RcInput;
