// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import MessageFilledSvg from '@ant-design/icons-svg/lib/asn/MessageFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const MessageFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={MessageFilledSvg} />;

MessageFilled.displayName = 'MessageFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(MessageFilled);