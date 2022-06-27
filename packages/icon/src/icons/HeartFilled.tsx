// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import HeartFilledSvg from '@ant-design/icons-svg/lib/asn/HeartFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const HeartFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={HeartFilledSvg} />;

HeartFilled.displayName = 'HeartFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(HeartFilled);