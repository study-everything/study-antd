// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import NotificationOutlinedSvg from '@ant-design/icons-svg/lib/asn/NotificationOutlined';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const NotificationOutlined = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={NotificationOutlinedSvg} />;

NotificationOutlined.displayName = 'NotificationOutlined';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(NotificationOutlined);