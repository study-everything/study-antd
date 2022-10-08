import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
// import omit from './utils/omit';
import type { CheckboxChangeEvent } from './Checkbox';
import Checkbox from './Checkbox';
import { ConfigContext } from './config-provider';

// 值类型
export type CheckboxValueType = string | number | boolean;

// option类型
export interface CheckboxOptionType {
  label: React.ReactNode;
  value: CheckboxValueType;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
}

export interface AbstractCheckboxGroupProps {
  prefixCls?: string;
  className?: string;
  options?: Array<CheckboxOptionType | string | number>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

// CheckboxGroupProps类型约束为AbstractCheckboxGroupProps
export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
  name?: string;
  defaultValue?: Array<CheckboxValueType>;
  value?: Array<CheckboxValueType>;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
  children?: React.ReactNode;
}

export interface CheckboxGroupContext {
  name?: string;
  toggleOption?: (option: CheckboxOptionType) => void;
  value?: any;
  disabled?: boolean;
  registerValue: (val: string) => void;
  cancelValue: (val: string) => void;
}

// 传输给子checkbox元素的comtext，子组件通过useContext钩子接受
export const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

// checkboxGroup函数组件
const InternalCheckboxGroup: React.ForwardRefRenderFunction<HTMLDivElement, CheckboxGroupProps> = (
  {
    defaultValue, // 默认选中的选项
    options = [], // 指定可选项
    onChange, // 变化时回调函数
    children, // 子组件
    prefixCls: customizePrefixCls,  // 前缀
    className, // 类名
    style, // 样式
    ...restProps // 其他属性
  },
  ref, // 利用forwardRef包裹接受父组件穿过来的ref
) => {
  // 获取上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 的值
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  // checkbox的值
  const [value, setValue] = React.useState<CheckboxValueType[]>(
    restProps.value || defaultValue || [],
  );

  const [registeredValues, setRegisteredValues] = React.useState<CheckboxValueType[]>([]);

  // componentDidUpdate
  React.useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || []);
    }
  }, [restProps.value]);

  // 获取选项
  const getOptions = () =>
    options.map(option => {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });

  // 取消值
  const cancelValue = (val: string) => {
    setRegisteredValues(prevValues => prevValues.filter(v => v !== val));
  };

  // 增加值
  const registerValue = (val: string) => {
    setRegisteredValues(prevValues => [...prevValues, val]);
  };

  // 调用onChange方法
  const toggleOption = (option: CheckboxOptionType) => {
    const optionIndex = value.indexOf(option.value);
    const newValue = [...value];
    if (optionIndex === -1) { // 没有就增加
      newValue.push(option.value);
    } else { // 有就删除
      newValue.splice(optionIndex, 1);
    }
    if (!('value' in restProps)) { // group有value属性就使用新value替换
      setValue(newValue);
    }
    const opts = getOptions();
    onChange?.(
      newValue
        .filter(val => registeredValues.indexOf(val) !== -1)
        .sort((a, b) => { // 按照options的顺序排列值
          const indexA = opts.findIndex(opt => opt.value === a);
          const indexB = opts.findIndex(opt => opt.value === b);
          return indexA - indexB;
        }),
    );
  };

  // 前缀
  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;

  // 复制restProps并删掉属性'value'和'disabled'
  const domProps = omit(restProps, ['value', 'disabled']);
  let tempChildren = children
  if (options && options.length > 0) {// 根据options生成children
    tempChildren = getOptions().map(option => (
      <Checkbox
        prefixCls={prefixCls}
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : restProps.disabled}
        value={option.value}
        checked={value.indexOf(option.value) !== -1}
        onChange={option.onChange}
        className={`${groupPrefixCls}-item`}
        style={option.style}
      >
        {option.label}
      </Checkbox>
    ));
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {  // 传给子组件checkbox的context
    toggleOption,
    value,
    disabled: restProps.disabled,
    name: restProps.name,
    // https://github.com/ant-design/ant-design/issues/16376
    registerValue,
    cancelValue,
  };
  // checkboxgroup的类名
  const classString = classNames(
    groupPrefixCls,
    {
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );
  return (
    <div className={classString} style={style} {...domProps} ref={ref}>
      {/* 利用provider传递context给子组件，子组件通过useContext方法获取context */}
      <GroupContext.Provider value={context}>{tempChildren}</GroupContext.Provider>
    </div>
  );
};

// 通过forwardRef包裹获取上层组件传递过来的ref
const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(InternalCheckboxGroup);

// memo方法缓存CheckboxGroup组件，props不变的情况下直接复用最近一次的渲染结果
// React.memo 仅检查 props 变更，默认情况下其只会对复杂对象做浅层对比
export default React.memo(CheckboxGroup);
