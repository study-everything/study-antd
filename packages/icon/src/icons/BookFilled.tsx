// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import BookFilledSvg from '@ant-design/icons-svg/lib/asn/BookFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const BookFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={BookFilledSvg} />;

BookFilled.displayName = 'BookFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(BookFilled);