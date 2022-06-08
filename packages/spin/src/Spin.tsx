import classNames from 'classnames';
import debounce from 'lodash/debounce';
import omit from 'rc-util/lib/omit';
import React from 'react';
import { cloneElement, isValidElement, tuple } from './utils';

const SpinPrefixCls = 'ant-spin';
const SpinSizes = tuple('small', 'default', 'large');
export type SpinSize = typeof SpinSizes[number];
export type SpinIndicator = React.ReactElement<HTMLElement>;
export type DirectionType = 'ltr' | 'rtl' | undefined;
export interface SpinState {
  spinning?: boolean;
  notCssAnimationSupported?: boolean;
}
export interface SpinProps {
  //   prefixCls?: string;
  wrapperClassName?: string; // 包装器的类属性
  style?: React.CSSProperties;
  className?: string;
  spinning?: boolean; // 是否为加载中状态
  size?: SpinSize; // 组建大小'small', 'default', 'large'
  tip?: React.ReactNode; // 当作为包裹元素时，可以自定义描述文案
  delay?: number; // 延迟显示加载效果的时间（防止闪烁）
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

class SpinCC extends React.Component<SpinProps, SpinState> {
  originalUpdateSpinning: () => void;

  static setDefaultIndicator = (indicator: React.ReactNode) => {
    defaultIndicator = indicator;
  };

  constructor(props: SpinProps) {
    super(props);

    const { spinning, delay } = props;
    const shouldBeDelayed = shouldDelay(spinning, delay);
    this.state = {
      spinning: spinning && !shouldBeDelayed,
    };
    this.originalUpdateSpinning = this.updateSpinning;
    this.debouncifyUpdateSpinning(props);
  }

  componentDidMount() {
    this.updateSpinning();
  }

  componentDidUpdate() {
    this.debouncifyUpdateSpinning();
    this.updateSpinning();
  }

  componentWillUnmount() {
    this.cancelExistingSpin();
  }

  debouncifyUpdateSpinning = (props?: SpinProps) => {
    const { delay } = props || this.props;
    if (delay) {
      this.cancelExistingSpin();
      this.updateSpinning = debounce(this.originalUpdateSpinning, delay);
    }
  };

  updateSpinning = () => {
    const { spinning } = this.props;
    const { spinning: currentSpinning } = this.state;
    if (currentSpinning !== spinning) {
      this.setState({ spinning });
    }
  };

  cancelExistingSpin() {
    const { updateSpinning } = this;
    if (updateSpinning && (updateSpinning as any).cancel) {
      (updateSpinning as any).cancel();
    }
  }

  isNestedPattern() {
    return !!(this.props && typeof this.props.children !== 'undefined');
  }

  renderSpin = (prefixCls: string) => {
    const {
      //   spinPrefixCls: prefixCls,
      className,
      size,
      tip,
      wrapperClassName,
      style,
      direction,
      ...restProps
    } = this.props;
    const { spinning } = this.state;

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

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(restProps, ['spinning', 'delay', 'indicator']);

    const spinElement = (
      <div
        {...divProps}
        style={style}
        className={spinClassName}
        aria-live="polite"
        aria-busy={spinning}
      >
        {renderIndicator(prefixCls, this.props)}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    );
    if (this.isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      });
      return (
        <div {...divProps} className={classNames(`${prefixCls}-nested-loading`, wrapperClassName)}>
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {this.props.children}
          </div>
        </div>
      );
    }
    return spinElement;
  };

  render() {
    return this.renderSpin(SpinPrefixCls);
  }
}

export const Spin: SpinFCType = (props: SpinProps) => <SpinCC {...props} />;

Spin.setDefaultIndicator = (indicator: React.ReactNode) => {
  defaultIndicator = indicator;
};

export type SpinFCType = React.FC<SpinProps> & {
  setDefaultIndicator: (indicator: React.ReactNode) => void;
};
