// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import LoadingOutlinedSvg from '@ant-design/icons-svg/lib/asn/LoadingOutlined';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const LoadingOutlined = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={LoadingOutlinedSvg} />;

LoadingOutlined.displayName = 'LoadingOutlined';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(LoadingOutlined);