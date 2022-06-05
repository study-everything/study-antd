import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// import debounce from 'lodash/debounce';
// import omit from 'rc-util/lib/omit';
import { tuple, isValidElement, cloneElement } from './utils';

const SpinPrefixCls = 'ant-spin';
const SpinSizes = tuple('small', 'default', 'large');
export type SpinSize = typeof SpinSizes[number];
export type SpinIndicator = React.ReactElement<HTMLElement>;
export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface SpinProps {
  //   prefixCls?: string;
  className?: string;
  spinning?: boolean; // 是否为加载中状态
  style?: React.CSSProperties;
  size?: SpinSize; // 组建大小'small', 'default', 'large'
  tip?: React.ReactNode; // 当作为包裹元素时，可以自定义描述文案
  delay?: number; // 延迟显示加载效果的时间（防止闪烁）
  wrapperClassName?: string; // 包装器的类属性
  indicator?: SpinIndicator; // 加载指示符
  children?: React.ReactNode;
  direction?: DirectionType;
}

// Render indicator
let defaultIndicator: React.ReactNode = null;

function renderIndicator(prefixCls: string, props: SpinProps) {
  const { indicator } = props;
  const dotClassName = `${prefixCls}-dot`;

  // 如果indicator为空，则不渲染
  if (indicator === null) {
    return null;
  }

  // 给自定义指示器添加类名，如果自定义indicator合法则使用
  if (isValidElement(indicator)) {
    return cloneElement(indicator, {
      className: classNames(indicator.props.className, dotClassName),
    });
  }

  // 如果自定义indicator不合法，则用默认的
  if (isValidElement(defaultIndicator)) {
    return cloneElement(defaultIndicator as SpinIndicator, {
      className: classNames((defaultIndicator as SpinIndicator).props.className, dotClassName),
    });
  }

  return (
    <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
    </span>
  );
}

function shouldDelay(spinning?: boolean, delay?: number) {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

export const Spin: SpinFCType = (props: SpinProps) => {
  const {
    size,
    tip,
    className,
    wrapperClassName,
    style,
    direction,
    spinning,
    delay,
    ...restProps
  } = props;

  const shouldBeDelayed = shouldDelay(spinning, delay);
  const [currentSpinning, updateCurrentSpinning] = useState(spinning && !shouldBeDelayed);

  const updateSpinning = () => {
    if (spinning !== currentSpinning) {
      updateCurrentSpinning(spinning);
    }
  };

  // componentDidMount
  useEffect(() => {
    updateSpinning();

    // componentWillUnmount
    return () => {};
  }, []);

  // componentDidUpdate
  useEffect(() => {
    updateSpinning();
  });

  const isNestedPattern = () => !!(props && typeof props.children !== 'undefined');

  const renderSpin = (prefixCls: string) => {
    // 根据属性给spin加上类
    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    const spinElement = (
      <div
        {...restProps}
        style={style}
        className={spinClassName}
        aria-live="polite"
        aria-busy={spinning}
      >
        {renderIndicator(prefixCls, props)}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    );

    // 如果是包裹模式，则返回这个
    if (isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      });
      return (
        <div {...restProps} className={classNames(`${prefixCls}-nested-loading`, wrapperClassName)}>
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {props.children}
          </div>
        </div>
      );
    }

    // 否则返回这个
    return spinElement;
  };

  return renderSpin(SpinPrefixCls);
};

// 可以全局设置默认的指示器
Spin.setDefaultIndicator = (indicator: React.ReactNode) => {
  defaultIndicator = indicator;
};

export type SpinFCType = React.FC<SpinProps> & {
  setDefaultIndicator: (indicator: React.ReactNode) => void;
};
