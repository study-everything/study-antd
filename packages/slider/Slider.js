import * as React from "react";
import classNames from "classnames";
import useDrag from "./hooks/useDrag";
import useOffset from "./hooks/useOffset";
import SliderContext from "./context";
import useMergedState from "rc-util/lib/hooks/useMergedState";
import shallowEqual from "shallowequal";

import Handles from "./Handles";

const Slider = React.forwardRef((props, ref) => {
  const {
    prefixCls = "rc-slider",
    className = "xxxx",
    style = {},
    disabled = false,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    range,
    handleStyle = {},
    onChange,
    vertical = false,
    railStyle = {},
    tabIndex = 0,
  } = props;

  const containerRef = React.useRef();
  const handlesRef = React.useRef();

  const direction = "ltr";
  const mergedMin = 1;
  const mergedMax = 100;
  const mergedStep = 1;
  const markList = [];

  const [formatValue, offsetValues] = useOffset(
    mergedMin,
    mergedMax,
    mergedStep,
    markList
    // allowCross,
    // mergedPush
  );

  // 优先级  value---> 0   mergedValue  为 value 或 0
  const [mergedValue, setValue] = useMergedState(defaultValue, {
    value,
  });

  // 数组, 如果有多个值，分段存进
  const rawValues = React.useMemo(() => {
    const valueList =
      mergedValue === null || mergedValue === undefined
        ? []
        : Array.isArray(mergedValue)
          ? mergedValue
          : [mergedValue];

    const [val0 = mergedMin] = valueList;
    let returnValues = mergedValue === null ? [] : [val0];
    return returnValues;
  }, [mergedValue]);

  const rawValuesRef = React.useRef(rawValues);
  rawValuesRef.current = rawValues;

  //   const getTriggerValue = (triggerValues) =>
  //     range ? triggerValues : triggerValues[0];

  const getTriggerValue = (triggerValues) => triggerValues[0];

  const triggerChange = (nextValues) => {
    const cloneNextValues = [...nextValues].sort((a, b) => a - b);

    if (onChange && !shallowEqual(cloneNextValues, rawValuesRef.current)) {
      onChange(getTriggerValue(cloneNextValues));
    }
    setValue(cloneNextValues);
  };

  const changeToCloseValue = (newValue) => {
    if (!disabled) {
      let valueIndex = 0;
      const cloneNextValues = [...rawValues];
      cloneNextValues[valueIndex] = newValue;
      //   onBeforeChange?.(getTriggerValue(cloneNextValues));
      triggerChange(cloneNextValues);
      //   onAfterChange?.(getTriggerValue(cloneNextValues));
    }
  };

  const onSliderMouseDown = (e) => {
    e.preventDefault();
    const {
      width,
      height,
      left,
      top,
      bottom,
      right,
    } = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    let percent = (clientX - left) / width;

    const nextValue = mergedMin + percent * (mergedMax - mergedMin);
    const newValue = formatValue(nextValue); // 按照 step 处理数值
    console.log("newValue-----", newValue);
    console.log("nextValue-----", nextValue);
    changeToCloseValue(newValue);
  };

  const [draggingIndex, draggingValue, cacheValues, onStartDrag] = useDrag(
    containerRef,
    direction,
    rawValues,
    mergedMin,
    mergedMax,
    formatValue,
    triggerChange,
    () => { },
    // finishChange,
    offsetValues
  );

  const onStartMove = (e, valueIndex) => {
    onStartDrag(e, valueIndex);
    // onBeforeChange?.(getTriggerValue(rawValuesRef.current));
  };

  const dragging = draggingIndex !== -1;

  const context = React.useMemo(
    () => ({
      min: mergedMin,
      max: mergedMax,
      direction,
      disabled,
      //   step: mergedStep,
      step: 1,
      //   included,
      // includedStart,
      // includedEnd,
      range,
      tabIndex,
    }),
    [
      mergedMin,
      mergedMax,
      direction,
      disabled,
      //   mergedStep,
      //   included,
      // includedStart,
      // includedEnd,
      range,
      tabIndex,
    ]
  );

  console.log("handlesRef.current-----", handlesRef.current);

  return (
    <SliderContext.Provider value={context}>
      <div
        ref={containerRef}
        className={classNames(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-vertical`]: vertical,
          [`${prefixCls}-horizontal`]: !vertical,
          //   [`${prefixCls}-with-marks`]: markList.length,
        })}
        style={style}
        onMouseDown={onSliderMouseDown}
      >
        <div className={`${prefixCls}-rail`} style={railStyle} />

        <Handles
          ref={handlesRef}
          prefixCls={prefixCls}
          style={handleStyle}
          values={cacheValues}
          draggingIndex={draggingIndex}
          onStartMove={onStartMove}
        />
      </div>
      <div> {cacheValues}</div>
    </SliderContext.Provider>
  );
});

if (process.env.NODE_ENV !== "production") {
  Slider.displayName = "Slider";
}

export default Slider;
