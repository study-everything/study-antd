import classNames from 'classnames';
import * as React from 'react';

// import type { ConfigConsumerProps } from '../config-provider';
// import { withConfigConsumer } from '../config-provider/context';
// import Skeleton from '../skeleton';
import type Countdown from './Countdown';
import StatisticNumber from './Number';
import type { FormatConfig, valueType } from './utils';

import useStyle from './style';

interface StatisticComponent {
  Countdown: typeof Countdown;
}


export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
];
export interface StatisticProps extends FormatConfig {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: valueType;
  valueStyle?: React.CSSProperties;
  valueRender?: (node: React.ReactNode) => React.ReactNode;
  title?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const Statistic = (props) => {
  const {
    prefixCls,
    className,
    style,
    valueStyle,
    value = 0,
    title,
    valueRender,
    prefix,
    suffix,
    // loading = false,
    direction,
    onMouseEnter,
    onMouseLeave,
    decimalSeparator = '.',
    groupSeparator = ',',
  } = props;
  const valueNode = (
    <StatisticNumber
      decimalSeparator={decimalSeparator}
      groupSeparator={groupSeparator}
      {...props}
      value={value}
    />
  );
  // Style
  // const [wrapSSR, hashId] = useStyle(String(prefixCls));
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    // hashId,
  );
  // return <div>1121212333</div>
  return (
      <div className={cls} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      {/* <Skeleton paragraph={false} loading={loading} className={`${prefixCls}-skeleton`}> */}
        <div style={valueStyle} className={`${prefixCls}-content`}>
          {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
          {valueRender ? valueRender(valueNode) : valueNode}
          {suffix && <span className={`${prefixCls}-content-suffix`}>{suffix}</span>}
        </div>
      {/* </Skeleton> */}
    </div>
  )
  // return wrapSSR(
  //   <div className={cls} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
  //     {title && <div className={`${prefixCls}-title`}>{title}</div>}
  //     {/* <Skeleton paragraph={false} loading={loading} className={`${prefixCls}-skeleton`}> */}
  //       <div style={valueStyle} className={`${prefixCls}-content`}>
  //         {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
  //         {valueRender ? valueRender(valueNode) : valueNode}
  //         {suffix && <span className={`${prefixCls}-content-suffix`}>{suffix}</span>}
  //       </div>
  //     {/* </Skeleton> */}
  //   </div>,
  // );
};

// const WrapperStatistic = withConfigConsumer<StatisticProps>({
//   prefixCls: 'statistic',
// })<StatisticComponent>(Statistic);

// const WrapperStatistic = Statistic


// export default WrapperStatistic;
export default Statistic
