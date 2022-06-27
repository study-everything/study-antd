// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import CalendarFilledSvg from '@ant-design/icons-svg/lib/asn/CalendarFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const CalendarFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={CalendarFilledSvg} />;

CalendarFilled.displayName = 'CalendarFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(CalendarFilled);