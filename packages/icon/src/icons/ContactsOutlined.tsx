// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import ContactsOutlinedSvg from '@ant-design/icons-svg/lib/asn/ContactsOutlined';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const ContactsOutlined = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={ContactsOutlinedSvg} />;

ContactsOutlined.displayName = 'ContactsOutlined';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(ContactsOutlined);