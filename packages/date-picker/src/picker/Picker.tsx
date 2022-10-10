import * as React from 'react';
import classNames from 'classnames';
import warning from 'rc-util/lib/warning';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { AlignType } from '../trigger/interface';
import PickerPanel from './PickerPanel';
import type { PickerPanelBaseProps, PickerPanelTimeProps } from './PickerPanel'
import PickerTrigger from './PickerTrigger';
import { formatValue, isEqual, parseValue } from './utils/dateUtil';
import getDataOrAriaProps, { toArray } from './utils/miscUtil';
import type { ContextOperationRefProps } from './PanelContext';
import PanelContext from './PanelContext';
import type { OnPanelChange, PickerMode } from './interface';
import { getDefaultFormat, getInputSize, elementsContains } from './utils/uiUtil';
import usePickerInput from './hooks/usePickerInput';
import useTextValueMapping from './hooks/useTextValueMapping';
import useValueTexts from './hooks/useValueTexts';
import useHoverValue from './hooks/useHoverValue';
import type { GenerateConfig } from './generate';

export type PickerRefConfig = {
  focus: () => void;
  blur: () => void;
};

type Components = {
  button?: React.ComponentType | string;
  rangeItem?: React.ComponentType | string;
};

export interface PickerProps<DateType> {
  className?: string;
  locale?: any;
  picker?: PickerMode;
  value?: any;
  onChange?: any;
  onSelect?: any;
  showTime?: any;
  generateConfig?: GenerateConfig<DateType>;
  defaultValue?: DateType;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void
  prefixCls?: string;
  format?: string;
  disabledDate?: (date: DateType) => boolean
  use12Hours?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>, preventDefault: () => void) => void
  onPanelChange?: OnPanelChange<DateType>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  dropdownAlign?: AlignType;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  id?: string;
  tabIndex?: number;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
  suffixIcon?: React.ReactNode;
  allowClear?: boolean;
  clearIcon?: React.ReactNode;
  onOk?: (date: DateType) => void;
  components?: Components;
  dropdownClassName?: string;
  mode?: string;
  renderExtraFooter?: (mode: string) => React.ReactNode;
  autoFocus?: boolean;
  placeholder?: string;
  pickerRef?: React.MutableRefObject<PickerRefConfig>;
}

type OmitPanelProps<Props> = Omit<
  Props,
  'onChange' | 'hideHeader' | 'pickerValue' | 'onPickerValueChange'
>;

export type PickerDateProps<DateType> = PickerProps<DateType> &
  OmitPanelProps<PickerPanelBaseProps<DateType>>;

type InjectDefaultProps<Props> = Omit<
  Props,
  'locale' | 'generateConfig' | 'hideHeader' | 'components'
> & {
  locale?: any;
  size?: any;
  placement?: any;
  bordered?: boolean;
  status?: any;
};

export type PickerTimeProps<DateType> = InjectDefaultProps<{
  picker: 'time';
  /**
   * @deprecated Please use `defaultValue` directly instead
   * since `defaultOpenValue` will confuse user of current value status
   */
  defaultOpenValue?: DateType;
} & PickerProps<DateType> & Omit<OmitPanelProps<PickerPanelTimeProps<DateType>>, 'format'>>;

function InnerPicker<DateType>(props: PickerProps<DateType>) {
  const {
    id,
    tabIndex,
    className,
    locale,
    picker = 'date',
    value,
    onChange,
    onSelect,
    showTime,
    generateConfig,
    defaultValue,
    disabled,
    open,
    defaultOpen,
    prefixCls = 'rc-picker',
    format,
    onOpenChange,
    disabledDate,
    use12Hours,
    onKeyDown,
    onFocus,
    onBlur,
    onMouseUp,
    dropdownAlign,
    getPopupContainer,
    suffixIcon,
    allowClear,
    clearIcon,
    dropdownClassName,
    placeholder,
    autoFocus,
    pickerRef,
  } = props;

  const [mergedValue, setInnerValue] = useMergedState(null, {
    value,
    defaultValue,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const panelDivRef = React.useRef<HTMLDivElement>(null);
  const inputDivRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);


  const [selectedValue, setSelectedValue] = React.useState<DateType | null>(mergedValue);

  const operationRef = React.useRef<ContextOperationRefProps | null>(null);

  const [mergedOpen, triggerInnerOpen] = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
    postState: (postOpen) => (disabled ? false : postOpen),
    onChange: (newOpen) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      }
      if (!newOpen && operationRef.current?.onClose) {
        operationRef.current!.onClose();
      }
    },
  });

  const triggerChange = (newValue: DateType | null) => {
    setSelectedValue(newValue);
    setInnerValue(newValue);

    if (onChange && !isEqual(generateConfig, mergedValue, newValue)) {
      onChange(
        newValue,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        newValue ? formatValue(newValue, { generateConfig, locale, format: formatList[0] }) : '',
      );
    }
  }

  const triggerOpen = (newOpen: boolean) => {
    if (disabled && newOpen) {
      return;
    }

    triggerInnerOpen(newOpen);
  };

  const needConfirmButton: boolean = (picker === 'date' && !!showTime) || picker === 'time';

  const onContextSelect = (date: DateType, type: 'key' | 'mouse' | 'submit') => {
    if (type === 'submit' || (type !== 'key' && !needConfirmButton)) {
      triggerChange(date);
      triggerOpen(false);
    }
  }

  const formatList = toArray(getDefaultFormat(format, picker, showTime, use12Hours));

  const [valueTexts] = useValueTexts(selectedValue, {
    formatList,
    generateConfig,
    locale,
  });

  const [text, triggerTextChange, resetText] = useTextValueMapping({
    valueTexts,
    onTextChange: (newText) => {
      const inputDate: any = parseValue(newText, {
        locale,
        formatList,
        generateConfig,
      });
      if (inputDate && (!disabledDate || !disabledDate(inputDate))) {
        setSelectedValue(inputDate);
      }
    },
  });

  if (pickerRef) {
    pickerRef.current = {
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      blur: () => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      },
    };
  }

  const [hoverValue, onEnter, onLeave] = useHoverValue(text, {
    formatList,
    generateConfig,
    locale,
  });

  const forwardKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (mergedOpen && operationRef.current && operationRef.current.onKeyDown) {
      return operationRef.current.onKeyDown(e);
    }

    /* istanbul ignore next */
    /* eslint-disable no-lone-blocks */
    {
      warning(
        false,
        'Picker not correct forward KeyDown operation. Please help to fire issue about this.',
      );
      return false;
    }
  };

  const [inputProps, { focused, typing }] = usePickerInput({
    blurToCancel: needConfirmButton,
    open: mergedOpen,
    value: text,
    triggerOpen,
    forwardKeyDown,
    isClickOutside: (target) =>
      !elementsContains(
        [panelDivRef.current, inputDivRef.current, containerRef.current],
        target as HTMLElement,
      ),
    onSubmit: () => {
      if (
        !selectedValue ||
        (disabledDate && disabledDate(selectedValue))
      ) {
        return false;
      }

      triggerChange(selectedValue);
      triggerOpen(false);
      resetText();
      return true;
    },
    onCancel: () => {
      triggerOpen(false);
      setSelectedValue(mergedValue);
      resetText();
    },
    onKeyDown: (e, preventDefault) => {
      onKeyDown?.(e, preventDefault);
    },
    onFocus,
    onBlur,
  });

  const panelProps = {
    ...(props as any),
    className: undefined,
    style: undefined,
    pickerValue: undefined,
    onPickerValueChange: undefined,
    onChange: null,
  };

  const panelNode: React.ReactNode = (
    <PickerPanel<DateType>
      {...panelProps}
      generateConfig={generateConfig}
      className={classNames({
        [`${prefixCls}-panel-focused`]: !typing,
      })}
      value={selectedValue}
      locale={locale}
      tabIndex={-1}
      onSelect={(date) => {
        onSelect?.(date);
        setSelectedValue(date);
      }}
      onPanelChange={(viewDate, mode) => {
        const { onPanelChange } = props;
        onLeave(true);
        onPanelChange?.(viewDate, mode);
      }}
    />
  );

  const mergedInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id,
    tabIndex,
    disabled,
    readOnly: typeof formatList[0] === 'function' || !typing,
    value: hoverValue || text,
    onChange: (e) => {
      triggerTextChange(e.target.value);
    },
    autoFocus,
    placeholder,
    ref: inputRef,
    title: text,
    ...inputProps,
    size: getInputSize(picker, formatList[0], generateConfig),
    ...getDataOrAriaProps(props),
  };

  const panel = (
    <div
      className={`${prefixCls}-panel-container`}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      {panelNode}
    </div>
  );

  let suffixNode: React.ReactNode;
  if (suffixIcon) {
    suffixNode = <span className={`${prefixCls}-suffix`}>{suffixIcon}</span>;
  }

  let clearNode: React.ReactNode;
  if (allowClear && mergedValue && !disabled) {
    clearNode = (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <span
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          triggerChange(null);
          triggerOpen(false);
        }}
        className={`${prefixCls}-clear`}
        role="button"
      >
        {clearIcon || <span className={`${prefixCls}-clear-btn`} />}
      </span>
    );
  }

  const onInternalMouseUp: React.MouseEventHandler<HTMLDivElement> = (...args) => {
    if (onMouseUp) {
      onMouseUp(...args);
    }

    if (inputRef.current) {
      inputRef.current.focus();
      triggerOpen(true);
    }
  };

  return (
    <PanelContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        // operationRef,
        hideHeader: picker === 'time',
        panelRef: panelDivRef,
        onSelect: onContextSelect,
        open: mergedOpen,
        onDateMouseEnter: onEnter,
        onDateMouseLeave: onLeave,
      }}
    >
      <PickerTrigger
        visible={mergedOpen}
        popupElement={panel}
        prefixCls={prefixCls}
        dropdownAlign={dropdownAlign}
        dropdownClassName={dropdownClassName}
        getPopupContainer={getPopupContainer}
      >
        <div
          ref={containerRef}
          className={classNames(prefixCls, className, {
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-focused`]: focused,
          })}
          onMouseUp={onInternalMouseUp}
        >
          <div
            className={classNames(`${prefixCls}-input`, {
              [`${prefixCls}-input-placeholder`]: !!hoverValue,
            })}
            ref={inputDivRef}
          >
            <input {...mergedInputProps} />
            {suffixNode}
            {clearNode}
          </div>
        </div>
      </PickerTrigger>
    </PanelContext.Provider>
  )
}

class Picker extends React.Component {
  pickerRef = React.createRef<PickerRefConfig>();

  focus = () => {
    if (this.pickerRef.current) {
      this.pickerRef.current.focus();
    }
  };

  blur = () => {
    if (this.pickerRef.current) {
      this.pickerRef.current.blur();
    }
  };

  render() {
    return (
      <InnerPicker
        {...this.props}
        // @ts-ignore
        pickerRef={this.pickerRef as React.MutableRefObject<PickerRefConfig>}
      />
    );
  }
}

export default Picker;
