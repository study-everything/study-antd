import { useState } from 'react';
import useEvent from './useEvent';
import { useLayoutUpdateEffect } from './useLayoutEffect';

function hasValue(value) {
  return value !== undefined;
}
const useMergedState = (defaultStateValue, option) => {
  const { value } = option || {};

  const [innerValue, setInnerValue] = useState(() => {
    if (hasValue(value)) {
      return value;
    }
    return defaultStateValue;
  });

  const mergedValue = value !== undefined ? value : innerValue;
  const postMergedValue = mergedValue;

  // =========================== Change ===========================

  // const [prevValue, setPrevValue] = useState([mergedValue]);

  // value
  // useLayoutUpdateEffect(() => {
  //   if (!hasValue(value)) {
  //     setInnerValue(value);
  //   }
  // }, [value]);

  // =========================== Update ===========================
  const triggerChange = useEvent((updater, ignoreDestroy) => {
    setInnerValue(updater, ignoreDestroy);
  });
  return [postMergedValue, triggerChange];
};

export default useMergedState;
