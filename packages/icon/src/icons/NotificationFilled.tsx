// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import NotificationFilledSvg from '@ant-design/icons-svg/lib/asn/NotificationFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const NotificationFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={NotificationFilledSvg} />;

NotificationFilled.displayName = 'NotificationFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(NotificationFilled);