// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import SearchOutlinedSvg from '@ant-design/icons-svg/lib/asn/SearchOutlined';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const SearchOutlined = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={SearchOutlinedSvg} />;

SearchOutlined.displayName = 'SearchOutlined';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(SearchOutlined);