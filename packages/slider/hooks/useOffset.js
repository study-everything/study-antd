import * as React from "react";
export default function useOffset(min, max, step, markList) {
  const formatRangeValue = React.useCallback(
    (val) => {
      let formatNextValue = isFinite(val) ? val : min;
      formatNextValue = Math.min(max, val);
      formatNextValue = Math.max(min, formatNextValue);
      return formatNextValue;
    },
    [min, max]
  );
  const formatStepValue = React.useCallback(
    (val) => {
      if (step !== null) {
        const stepValue =
          min + Math.round((formatRangeValue(val) - min) / step) * step;

        const getDecimal = (num) => (String(num).split(".")[1] || "").length;

        const maxDecimal = Math.max(
          getDecimal(step),
          getDecimal(max),
          getDecimal(min)
        );
        const fixedValue = Number(stepValue.toFixed(maxDecimal));
        return min <= fixedValue && fixedValue <= max ? fixedValue : null;
      }

      return null;
    },
    [step, min, max, formatRangeValue]
  );
  const formatValue = React.useCallback(
    (val) => {
      let closeValue = formatStepValue(val);
      return closeValue;
    },
    [min, max, step, formatRangeValue, formatStepValue]
  );

  const offsetValue = (values, offset, valueIndex, mode = "unit") => {
    if (typeof offset === "number") {
      let nextValue;
      const originValue = values[valueIndex];
      const targetDistValue = originValue + offset;
      let potentialValues = [];
      markList.forEach((mark) => {
        potentialValues.push(mark.value);
      });
      potentialValues.push(min, max);
      potentialValues.push(formatStepValue(originValue));
      const sign = offset > 0 ? 1 : -1;

      if (mode === "unit") {
        potentialValues.push(formatStepValue(originValue + sign * step));
      } else {
        potentialValues.push(formatStepValue(targetDistValue));
      }

      potentialValues = potentialValues
        .filter((val) => val !== null)
        .filter((val) =>
          offset < 0 ? val <= originValue : val >= originValue
        );

      if (mode === "unit") {
        potentialValues = potentialValues.filter((val) => val !== originValue);
      }

      const compareValue = mode === "unit" ? originValue : targetDistValue;
      nextValue = potentialValues[0];
      let valueDist = Math.abs(nextValue - compareValue);
      potentialValues.forEach((potentialValue) => {
        const dist = Math.abs(potentialValue - compareValue);

        if (dist < valueDist) {
          nextValue = potentialValue;
          valueDist = dist;
        }
      });

      if (nextValue === undefined) {
        return offset < 0 ? min : max;
      }

      if (mode === "dist") {
        return nextValue;
      }

      if (Math.abs(offset) > 1) {
        const cloneValues = [...values];
        cloneValues[valueIndex] = nextValue;
        return offsetValue(cloneValues, offset - sign, valueIndex, mode);
      }

      return nextValue;
    } else if (offset === "min") {
      return min;
    } else if (offset === "max") {
      return max;
    }
  };

  const offsetValues = (values, offset, valueIndex, mode = "unit") => {
    const nextValues = values.map(formatValue);
    const nextValue = offsetValue(nextValues, offset, valueIndex, mode);
    nextValues[valueIndex] = nextValue;

    return {
      value: nextValues[valueIndex],
      values: nextValues,
    };
  };

  return [formatValue, offsetValues];
}
