// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import BankFilledSvg from '@ant-design/icons-svg/lib/asn/BankFilled';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const BankFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={BankFilledSvg} />;

BankFilled.displayName = 'BankFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(BankFilled);