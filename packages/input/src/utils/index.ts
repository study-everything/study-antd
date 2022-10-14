import classNames from 'classnames'
import type { BaseInputProps, RcInputProps,InputFocusOptions } from '../interface';

export function hasAddon(props: BaseInputProps | RcInputProps) {
  return !!(props.addonBefore || props.addonAfter);
}

export function hasPrefixSuffix(props: BaseInputProps | RcInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear);
}
// export  function omit<T extends object, K extends keyof T>(obj: T, fields: K[]): Omit<T, K>{
//   const nObj = new Proxy(obj,{})
//   fields.forEach(field=>{
//     delete nObj[field]
//   })
//   return nObj
// };

export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}

export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) return;

  element.focus(option);

  // Selection content
  const { cursor } = option || {};
  if (cursor) {
    const len = element.value.length;

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;

      case 'end':
        element.setSelectionRange(len, len);
        break;

      default:
        element.setSelectionRange(0, len);
    }
  }
}
export const tuple = <T extends string[]>(...args: T) => args; // 将多个参数转换成一个元组

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type ValidateStatus = typeof ValidateStatuses[number]; // 这段代码将元组元素转换成联合类型

export function getStatusClassNames(
  prefixCls: string,
  status?: ValidateStatus,
  hasFeedback?: boolean,
) {
  return classNames({
    [`${prefixCls}-status-success`]: status === 'success',
    [`${prefixCls}-status-warning`]: status === 'warning',
    [`${prefixCls}-status-error`]: status === 'error',
    [`${prefixCls}-status-validating`]: status === 'validating',
    [`${prefixCls}-has-feedback`]: hasFeedback,
  });
}