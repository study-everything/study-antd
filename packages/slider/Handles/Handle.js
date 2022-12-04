import * as React from "react";
import classNames from "classnames";
import KeyCode from "rc-util/lib/KeyCode";
import SliderContext from "../context";
import { getDirectionStyle, getIndex } from "../util";
const Handle = React.forwardRef((props, ref) => {
  const {
    prefixCls,
    value,
    valueIndex,
    onStartMove,
    style,
    dragging,
    ...restProps
  } = props;
  const {
    min,
    max,
    direction,
    disabled,
    range,
    tabIndex,
    ariaLabelForHandle,
    ariaLabelledByForHandle,
    ariaValueTextFormatterForHandle,
  } = React.useContext(SliderContext);
  const handlePrefixCls = `${prefixCls}-handle`;

  const onInternalStartMove = (e) => {
    if (!disabled) {
      onStartMove(e, valueIndex);
    }
  };

  // 得到其绝定位得位置 css 值， 如 left 值；
  const positionStyle = getDirectionStyle(direction, value, min, max);

  let handleNode = (
    <div
      ref={ref}
      className={classNames(handlePrefixCls, {
        [`${handlePrefixCls}-${valueIndex + 1}`]: range,
        [`${handlePrefixCls}-dragging`]: dragging,
      })}
      style={{ ...positionStyle, ...style }}
      onMouseDown={onInternalStartMove}
      onTouchStart={onInternalStartMove}
      tabIndex={disabled ? null : getIndex(tabIndex, valueIndex)}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
      aria-label={getIndex(ariaLabelForHandle, valueIndex)}
      aria-labelledby={getIndex(ariaLabelledByForHandle, valueIndex)}
      aria-valuetext={getIndex(
        ariaValueTextFormatterForHandle,
        valueIndex
      )?.(value)}
      {...restProps}
    />
  );

  return handleNode;
});

if (process.env.NODE_ENV !== "production") {
  Handle.displayName = "Handle";
}

export default Handle;
