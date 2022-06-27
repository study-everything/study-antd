export const getPrefixCls= (suffixCls: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;
  return `ant-${suffixCls}`;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
