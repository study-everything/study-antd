import * as React from 'react';
import classNames from 'classnames';
import { warning } from '@study/util';
import { SizeType } from './button';

export interface ButtonGroupProps {
  size?: SizeType;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  children?: React.ReactNode;
	direction?: "ltr" | "rtl" | undefined
}

export const GroupSizeContext = React.createContext<SizeType | undefined>(undefined);

const ButtonGroup: React.FC<ButtonGroupProps> = props => {

  const { prefixCls, size, className, direction = 'ltr', ...others } = props;

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    case 'middle':
    case undefined:
      break;
    default:
      warning(!size, 'Button.Group', 'Invalid prop `size`.');
  }

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    <GroupSizeContext.Provider value={size}>
      <div {...others} className={classes} />
    </GroupSizeContext.Provider>
  );
};

export default ButtonGroup;
