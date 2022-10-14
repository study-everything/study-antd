import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import classNames from 'classnames';
import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import { ConfigContext } from 'antd/es/config-provider';
import SizeContext from 'antd/es/config-provider/SizeContext';
import LocaleReceiver from 'antd/es/locale-provider/LocaleReceiver';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { GenerateConfig } from '../picker/generate/index';
import type { PickerMode } from '../picker/interface';
import RCPicker from '../picker';
import type { PickerProps } from '.';
import { Components, getTimeProps } from '.';
import enUS from '../locale/en_US'
import { transPlacement2DropdownAlign } from '../util';
import type { CommonPickerMethods, DatePickRef, PickerComponentClass } from './interface';

export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps = PickerProps<DateType> & {
    status?: any;
  };

  function getPicker<InnerPickerProps extends DatePickerProps>(
    picker?: PickerMode,
    displayName?: string,
  ) {
    const Picker = forwardRef<DatePickRef<DateType> | CommonPickerMethods, InnerPickerProps>(
      (props, ref) => {
        const {
          prefixCls: customizePrefixCls,
          getPopupContainer: customizeGetPopupContainer,
          className,
          disabled: customDisabled,
          ...restProps
        } = props;

        const { getPrefixCls, direction, getPopupContainer } = useContext(ConfigContext);
        const prefixCls = getPrefixCls('picker', customizePrefixCls);
        const innerRef = React.useRef<any>(null);
        const { format, showTime } = props as any;

        useImperativeHandle(ref, () => ({
          focus: () => innerRef.current?.focus(),
          blur: () => innerRef.current?.blur(),
        }));

        const additionalProps = {
          showToday: true,
        };

        let additionalOverrideProps: any = {};
        if (picker) {
          additionalOverrideProps.picker = picker;
        }
        const mergedPicker = picker || props.picker;

        additionalOverrideProps = {
          ...additionalOverrideProps,
          ...(showTime ? getTimeProps({ format, picker: mergedPicker, ...showTime }) : {}),
          ...(mergedPicker === 'time'
            ? getTimeProps({ format, ...props, picker: mergedPicker })
            : {}),
        };
        const rootPrefixCls = getPrefixCls();

        // ===================== Size =====================
        const size = React.useContext(SizeContext);
        const mergedSize = size;

        // ===================== Disabled =====================
        const mergedDisabled = customDisabled;

        const suffixNode = mergedPicker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />

        return (
          <LocaleReceiver componentName="DatePicker" defaultLocale={enUS}>
            {(contextLocale: any) => {
              const locale = { ...contextLocale, ...props.locale };

              return (
                <RCPicker
                  ref={innerRef}
                  dropdownAlign={transPlacement2DropdownAlign(direction)}
                  clearIcon={<CloseCircleFilled />}
                  suffixIcon={suffixNode}
                  prevIcon={<span className={`${prefixCls}-prev-icon`} />}
                  nextIcon={<span className={`${prefixCls}-next-icon`} />}
                  superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
                  superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
                  allowClear
                  transitionName={`${rootPrefixCls}-slide-up`}
                  {...additionalProps}
                  {...restProps}
                  {...additionalOverrideProps}
                  locale={locale!.lang}
                  className={classNames(
                    {
                      [`${prefixCls}-${mergedSize}`]: mergedSize,
                    },
                    className,
                  )}
                  prefixCls={prefixCls}
                  getPopupContainer={customizeGetPopupContainer || getPopupContainer}
                  generateConfig={generateConfig}
                  components={Components}
                  direction={direction}
                  disabled={mergedDisabled}
                />
              );
            }}
          </LocaleReceiver>
        );
      },
    );

    if (displayName) {
      Picker.displayName = displayName;
    }

    return Picker as unknown as PickerComponentClass<InnerPickerProps>;
  }

  const DatePicker = getPicker<DatePickerProps>();
  const WeekPicker = getPicker('week', 'WeekPicker');
  const MonthPicker = getPicker('month', 'MonthPicker');
  const YearPicker = getPicker('year', 'YearPicker');
  const TimePicker = getPicker('time', 'TimePicker');
  const QuarterPicker = getPicker(
    'quarter',
    'QuarterPicker',
  );

  return { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker };
}
