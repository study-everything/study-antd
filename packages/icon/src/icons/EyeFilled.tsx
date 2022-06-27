// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import EyeFilledSvg from '@ant-design/icons-svg/lib/asn/EyeFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const EyeFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={EyeFilledSvg} />;

EyeFilled.displayName = 'EyeFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(EyeFilled);