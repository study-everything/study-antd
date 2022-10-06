import type { ReactNode } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

type SegmentedValueType = string | number;

type SegmentedSizeType = 'large' | 'middle' | 'small';

type SegmentedRawOption = SegmentedValueType;

interface SegmentedLabeledOption {
  label?: ReactNode;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

type SegmentedOptions = (SegmentedRawOption | SegmentedLabeledOption)[];

export interface SegmentedProps {
  block?: boolean;
  /**
   * 默认选中的值
   */
  defaultValue?: SegmentedValueType;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 选项变化时的回调函数
   */
  onChange?: (value: SegmentedValueType) => void;
  /**
   * 数据化配置选项内容
   */
  options: SegmentedOptions;
  /**
   * 控件尺寸
   */
  size?: SegmentedSizeType;
  /**
   * 当前选中的值
   */
  value?: SegmentedValueType;
  className?: string;
  prefixCls?: string;
}

const normalizeOptions = (options: SegmentedOptions): SegmentedLabeledOption[] =>
  options.map(item => {
    if (typeof item === 'object' && item !== null) {
      return { ...item };
    }
    return {
      label: item?.toString(),
      value: item?.toString(),
    };
  });

export const Segmented: React.FC<SegmentedProps> = props => {
  const {
    block = false,
    defaultValue,
    disabled = false,
    onChange = () => {},
    options = [],
    size = 'middle',
    value,
    className,
    prefixCls: customizePrefixCls,
  } = props;

  const prefixCls = `${customizePrefixCls ?? 'ant'}-segmented`;

  const innerOptions = useMemo(() => normalizeOptions(options), [options]);
  const isControlled = useMemo(() => Object.prototype.hasOwnProperty.call(props, 'value'), [props]);

  const innerDefaultValue = useMemo(() => {
    if (defaultValue) {
      return defaultValue;
    }
    if (['string', 'number'].includes(typeof options?.[0])) {
      return options?.[0];
    }
    if (typeof options?.[0] === 'object' && options?.[0] !== null) {
      return options?.[0]?.value;
    }
    return undefined;
  }, []);

  const [innerValue, setInnerValue] = useState(innerDefaultValue);

  const handleClick = (e, o) => {
    if (!isControlled) setInnerValue(o.value);
    onChange(o.value);
  };

  useEffect(() => {
    if (isControlled) {
      setInnerValue(value);
    }
  }, [value]);

  return (
    <div
      className={classNames(className, `${prefixCls}`, {
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
      })}
    >
      <div className={`${prefixCls}-group`}>
        {innerOptions.map(option => {
          const { label, icon } = option;
          return (
            <span
              key={option.value}
              className={classNames(`${prefixCls}-item`, option?.className, {
                [`${prefixCls}-item-selected`]: innerValue === option.value,
                [`${prefixCls}-item-disabled`]: !!option?.disabled || !!disabled,
              })}
              onClick={e => !option?.disabled && !disabled && handleClick(e, option)}
            >
              <div className={`${prefixCls}-item-label`}>
                {!!icon && <span className={`${prefixCls}-item-icon`}>{icon}</span>}
                <span>{label}</span>
              </div>
            </span>
          );
        })}
      </div>
    </div>
  );
};
