// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import ProfileFilledSvg from '@ant-design/icons-svg/lib/asn/ProfileFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const ProfileFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={ProfileFilledSvg} />;

ProfileFilled.displayName = 'ProfileFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(ProfileFilled);