// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import LockOutlinedSvg from '@ant-design/icons-svg/lib/asn/LockOutlined';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const LockOutlined = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={LockOutlinedSvg} />;

LockOutlined.displayName = 'LockOutlined';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(LockOutlined);