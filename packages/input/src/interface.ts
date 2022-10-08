import type {
  ReactNode,
  InputHTMLAttributes,
  ReactElement,
  CSSProperties,
  MouseEventHandler,
  KeyboardEventHandler,
} from 'react';
import type { LiteralUnion, SizeType, InputStatus } from './types';

export interface CommonInputProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  affixWrapperClassName?: string;
  groupClassName?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  allowClear?: boolean | { clearIcon?: ReactNode };
}

export interface BaseInputProps extends CommonInputProps {
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
  inputElement: ReactElement;
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  focused?: boolean;
  triggerFocus?: () => void;
  readOnly?: boolean;
  handleReset?: MouseEventHandler;
  hidden?: boolean;
}

export interface ShowCountProps {
  formatter: (args: { value: string; count: number; maxLength?: number }) => ReactNode;
}

export interface RcInputProps
  extends CommonInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  prefixCls?: string;
  // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types
  type?: LiteralUnion<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
    string
  >;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  showCount?: boolean | ShowCountProps;
  autoComplete?: string;
  htmlSize?: number;
}

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}

export interface InputRef {
  focus: (options?: InputFocusOptions) => void;
  blur: () => void;
  setSelectionRange: (
    start: number,
    end: number,
    direction?: 'forward' | 'backward' | 'none',
  ) => void;
  select: () => void;
  input: HTMLInputElement | null;
}

export interface InputProps
  extends Omit<
    RcInputProps,
    'wrapperClassName' | 'groupClassName' | 'inputClassName' | 'affixWrapperClassName'
  > {
  size?: SizeType;
  disabled?: boolean;
  status?: InputStatus;
  bordered?: boolean;
  [key: `data-${string}`]: string | undefined;
}
