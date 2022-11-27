import type { Moment } from 'moment';
import * as React from 'react';
import DatePicker from '@study/date-picker/src';
import zhCN from '@study/date-picker/src/locale/zh_CN'
import type { PickerTimeProps } from '@study/date-picker/src/generatePicker';

const { TimePicker: InternalTimePicker } = DatePicker;

export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {
  addon?: () => React.ReactNode;
  popupClassName?: string;
}

const TimePicker = React.forwardRef<any, TimePickerProps>(
  ({ addon, popupClassName, ...restProps }, ref) => {
    const internalRenderExtraFooter = React.useMemo(() => {
      if (addon) {
        return addon;
      }
      return undefined;
    }, [addon]);

    return (
      <InternalTimePicker
        {...restProps}
        dropdownClassName={popupClassName}
        mode={undefined}
        ref={ref}
        locale={zhCN}
        renderExtraFooter={internalRenderExtraFooter}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  TimePicker.displayName = 'TimePicker';
}

export default TimePicker;
