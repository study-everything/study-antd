/* 
  主要是调用RcInput组件，为该组件传入一些预先设置好的属性，这些属性是从用户或者统一的context里取到的
	因为是简版，所以不再处理context，直接使用默认赋值来实现类似功能
	自动校验相关功能，因为涉及到context,目前先不做。即 hasFeedback=false
	主要处理样式相关属性：
	status 表单校验的状态，error为红色，warn为橙色
	bordered 是否需要边框
*/
import React, { forwardRef, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import RcInput from './RcInput';
import type { InputProps, InputRef } from './interface';
import { getStatusClassNames, hasPrefixSuffix } from './utils';

// const direction = ''; 控制从左到右输入还是从右到左输入
const hasFeedback = false;
const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    size = 'middle',
    disabled = false,
    status = '',
    onBlur,
    onFocus,
    autoComplete,
    prefixCls = 'ant-input',
    allowClear,
    addonAfter,
    addonBefore,
    bordered = true,
    suffix,
    ...rest
  } = props;
  const inputRef = useRef<InputRef>(null);

  // 处理password密码框切换显隐状态导致的将密码明文保留在input组件value属性上的问题
  const removePasswordTimeoutRef = useRef<number[]>([]);
  const removePasswordTimeout = () => {
    removePasswordTimeoutRef.current.push(
      window.setTimeout(() => {
        if (
          inputRef.current?.input &&
          inputRef.current?.input.getAttribute('type') === 'password' &&
          inputRef.current?.input.hasAttribute('value')
        ) {
          inputRef.current?.input.removeAttribute('value');
        }
      }),
    );
  };
  // 初始化时清空所有定时器，在blur和focus触发时，移除type=password的input dom元素的value属性
  useEffect(() => {
    removePasswordTimeout();
    return () => removePasswordTimeoutRef.current.forEach(item => window.clearTimeout(item));
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onFocus?.(e);
  };

  const inputHasPrefixSuffix = hasPrefixSuffix(props) || !!hasFeedback;

  return (
    <RcInput
      ref={composeRef(ref, inputRef)}
      prefixCls={prefixCls}
      autoComplete={autoComplete}
      {...rest}
      disabled={disabled || undefined}
      onBlur={handleBlur}
      onFocus={handleFocus}
      suffix={suffix}
      allowClear={allowClear}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      inputClassName={classNames(
        {
          [`${prefixCls}-sm`]: size === 'small',
          [`${prefixCls}-lg`]: size === 'large',
          // [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-borderless`]: !bordered,
        },
        !inputHasPrefixSuffix && getStatusClassNames(prefixCls, status),
      )}
      affixWrapperClassName={classNames(
        {
          [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
          [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
          // [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
          [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        },
        getStatusClassNames(`${prefixCls}-affix-wrapper`, status, hasFeedback),
      )}
      wrapperClassName={classNames({
        // [`${prefixCls}-group-rtl`]: direction === 'rtl',
      })}
      groupClassName={classNames(
        {
          [`${prefixCls}-group-wrapper-sm`]: size === 'small',
          [`${prefixCls}-group-wrapper-lg`]: size === 'large',
          // [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
        },
        getStatusClassNames(`${prefixCls}-group-wrapper`, status, hasFeedback),
      )}
    />
  );
});

export default Input;
