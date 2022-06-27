// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import LockFilledSvg from '@ant-design/icons-svg/lib/asn/LockFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const LockFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={LockFilledSvg} />;

LockFilled.displayName = 'LockFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(LockFilled);