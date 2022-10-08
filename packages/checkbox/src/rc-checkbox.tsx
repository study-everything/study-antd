import type { ForwardRefRenderFunction } from 'react';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import type {CheckboxChangeEvent} from './Checkbox'

export interface Props {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  id?: string;
  type?: string;
  title?: string;
  defaultChecked?: boolean;
  checked?: number | boolean;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: CheckboxChangeEvent) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  tabIndex?: number;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  value?: any;
}

const Checkbox:ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
  const {
    prefixCls = 'rc-checkbox',
    className = '',
    style = {},
    type = 'checkbox',
    title = '',
    defaultChecked = false,
    onClick = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onChange = () => {},
    onKeyDown = () => {},
    onKeyPress = () => {},
    onKeyUp = () => {},
    name,
    id,
    disabled,
    readOnly,
    tabIndex,
    autoFocus,
    value,
    required,
    checked,
    ...others
  } = props
  const ischecked = checked !== undefined ? checked : defaultChecked;
  const [innerChecked, setInnerChecked] = useState(ischecked)

  useEffect(() => {
    if (checked !== undefined) {
      setInnerChecked(checked)
    }
  }, [checked])

  const handleChange = (e) => {
    if (disabled) {
      return;
    }
    if (!(checked !== undefined)) {
      setInnerChecked(e.target.checked)
    }
    if (onChange) {
      onChange({
        target: {
          ...props,
          checked: e.target.checked
        },
        stopPropagation() {
          e.stopPropagation();
        },
        preventDefault() {
          e.preventDefault();
        },
        nativeEvent: e.nativeEvent,
      });
    }
  };

  const globalProps = Object.keys(others).reduce((prev, key) => {
    if (key.slice(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
      // eslint-disable-next-line no-param-reassign
      prev[key] = others[key];
    }
    return prev;
  }, {});

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-checked`]: innerChecked,
    [`${prefixCls}-disabled`]: disabled,
  });

  return (
    <span className={classString} style={style}>
      <input
        name={name}
        id={id}
        type={type}
        title={title}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        tabIndex={tabIndex}
        className={`${prefixCls}-input`}
        checked={!!innerChecked}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onChange={handleChange}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        ref={ref}
        value={value}
        {...globalProps}
      />
      <span className={`${prefixCls}-inner`} />
    </span>
  );
}

const forwardCheckbox = React.forwardRef<HTMLDivElement, Props>(Checkbox);

export default forwardCheckbox;
