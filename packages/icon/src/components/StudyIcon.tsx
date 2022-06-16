import * as React from 'react';
import classNames from 'classnames';
import type { IconDefinition } from '@ant-design/icons-svg/lib/types';

import Context from './Context';
import type { IconBaseProps } from './Icon';
import ReactIcon from './IconBase';
import type { TwoToneColor} from './twoTonePrimaryColor';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
import { normalizeTwoToneColors } from '../utils';

export interface AntdIconProps extends IconBaseProps {
  twoToneColor?: TwoToneColor;
}
export interface IconComponentProps extends AntdIconProps {
  icon: IconDefinition;
}
interface IconBaseComponent<Props>
  extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLSpanElement>> {
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
}
setTwoToneColor('#1890ff');
const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>((props, ref) => {
  const {
    // affect outter <i>...</i>
    className,

    // affect inner <svg>...</svg>
    icon,
    spin,
    rotate,

    tabIndex,
    onClick,

    // other
    twoToneColor,

    ...restProps
  } = props;
  const { prefixCls = 'anticon' } = React.useContext(Context);

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-${icon.name}`]: !!icon.name,
      [`${prefixCls}-spin`]: !!spin || icon.name === 'loading',
    },
    className
  )
  const svgStyle = rotate
    ? {
      msTransform: `rotate(${rotate}deg)`,
      transform: `rotate(${rotate}deg)`,
    }
    : undefined;

  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);

  let iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  return (
    <span
      role="img"
      aria-label={icon.name}
      {...restProps}
      ref={ref}
      tabIndex={iconTabIndex}
      onClick={onClick}
      className={classString}
    >
      <ReactIcon icon={icon} primaryColor={primaryColor} secondaryColor={secondaryColor} style={svgStyle} />
    </span>

  )
}) as IconBaseComponent<IconComponentProps>;
Icon.displayName = 'StudyIcon';
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
export default Icon;