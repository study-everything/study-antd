import type { Moment } from 'moment';
import momentGenerateConfig from './picker/generate/moment';
import generatePicker from './generatePicker';
import type {
  PickerDateProps,
  PickerProps,
} from './generatePicker';

export type DatePickerProps = PickerProps<Moment>;
export type MonthPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;

const DatePicker = generatePicker<Moment>(momentGenerateConfig);

export default DatePicker;
