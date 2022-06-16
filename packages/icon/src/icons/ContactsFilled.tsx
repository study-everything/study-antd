// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import ContactsFilledSvg from '@ant-design/icons-svg/lib/asn/ContactsFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const ContactsFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={ContactsFilledSvg} />;

ContactsFilled.displayName = 'ContactsFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(ContactsFilled);