
import type { CSSProperties, MouseEventHandler, KeyboardEventHandler, ReactNode, ForwardRefRenderFunction } from 'react';
import React, { useContext, useRef, useEffect, forwardRef } from 'react'
import classNames from 'classnames';
import RcCheckbox from './rc-checkbox';
import Group, { GroupContext } from './Group';
import { FormItemInputContext } from './form/context';
import { ConfigContext } from './config-provider';
import warning from './utils/warning';

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onClick?: MouseEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onKeyPress?: KeyboardEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: ReactNode;
  id?: string;
  autoFocus?: boolean;
  type?: string;
  skipGroup?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

// CheckboxProps类型约束AbstractCheckboxProps
export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean; // 是否模糊状态：未完全选中
}

// checkbox函数组件
const InternalCheckbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  {
    prefixCls: customizePrefixCls, // 前缀
    className, // 类名
    children, // 子组件
    indeterminate = false,// 是否模糊状态：未完全选中
    style,// 样式
    onMouseEnter,
    onMouseLeave,
    skipGroup = false, // 跳过group?
    ...restProps // 其他属性
  },
  ref,
) => {
  // 获取生成前缀函数、方向？
  const { getPrefixCls, direction } = useContext(ConfigContext);
  // 获取上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 的值
  const checkboxGroup = useContext(GroupContext);
  // 表单的context?
  const { isFormItemInput } = useContext(FormItemInputContext);

  // 类似于在 class 中使用实例字段的方式，保存restProps.value的值
  const prevValue = useRef(restProps.value); // .current属性指向restProps.value

  // componentDidMount
  useEffect(() => {
    // 给group赋值
    checkboxGroup?.registerValue(restProps.value);
    warning(
      'checked' in restProps || !!checkboxGroup || !('value' in restProps),
      'Checkbox',
      '`value` is not a valid prop, do you mean `checked`?',
    );
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (skipGroup) { // 跳过group?
      return;
    }
    if (restProps.value !== prevValue.current) {
      checkboxGroup?.cancelValue(prevValue.current);
      checkboxGroup?.registerValue(restProps.value);
      prevValue.current = restProps.value;
    }
    // componentWillUnMount
    // eslint-disable-next-line consistent-return
    return () => checkboxGroup?.cancelValue(restProps.value);
  }, [restProps.value]);

  // 获取类名前缀
  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  // checkbox属性
  const checkboxProps: CheckboxProps = { ...restProps };
  // 如果skipGroup为false且有checkboxGroup则要改变checkboxGroup组件的值
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      // 改造属性中的onChange属性
      if (restProps.onChange) {
        restProps.onChange(...args);
      }
      if (checkboxGroup.toggleOption) {
        // 调用checkboxGroup的context中的toggleOption
        checkboxGroup.toggleOption({ label: children, value: restProps.value });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.indexOf(restProps.value) !== -1;
    checkboxProps.disabled = restProps.disabled || checkboxGroup.disabled;
  }
  // 生成label类名
  const classString = classNames(
    {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
      [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    },
    className,
  );
  // 生成rccheckbox组件类名
  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate,
  });
  // 是否模糊，选中但未全选的时候是模糊
  const ariaChecked = indeterminate ? 'mixed' : undefined;
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={classString}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <RcCheckbox
        aria-checked={ariaChecked}
        {...checkboxProps}
        prefixCls={prefixCls}
        className={checkboxClass}
        ref={ref}
      />
      {children !== undefined && <span>{children}</span>}
    </label>
  );
};

// 使用forwardRef包裹，传递上层组件的ref属性给InternalCheckbox
const forwardCheckbox = forwardRef<unknown, CheckboxProps>(InternalCheckbox);

// forwardCheckbox.displayName = 'Checkbox';

// interface CompoundedComponent
//   extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
//   Group: typeof Group;
//   __ANT_CHECKBOX: boolean;
// }

// const checkbox = forwardCheckbox as CompoundedComponent
// checkbox.Group = Group;

export default forwardCheckbox;