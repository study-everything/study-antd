import React, { useEffect } from 'react';
import { tuple } from './utils';

const SpinSizes = tuple('small', 'default', 'large');
export type SpinSize = typeof SpinSizes[number];
export type SpinIndicator = React.ReactElement<HTMLElement>;
export interface SpinProps {
  prefixCls?: string;
  className?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: SpinSize;
  tip?: React.ReactNode;
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
  children?: React.ReactNode;
}

export const Spin: React.FC<SpinProps> = (props: SpinProps) => {
  const { size } = props;
  useEffect(() => {
    console.log(size);
  }, []);

  return <div>Spin</div>;
};
