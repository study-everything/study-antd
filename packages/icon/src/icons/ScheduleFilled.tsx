// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import ScheduleFilledSvg from '@ant-design/icons-svg/lib/asn/ScheduleFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const ScheduleFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={ScheduleFilledSvg} />;

ScheduleFilled.displayName = 'ScheduleFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(ScheduleFilled);