import * as React from "react";
import Handle from "./Handle";
import { getIndex } from "../util";
const Handles = React.forwardRef((props, ref) => {
  const {
    prefixCls,
    style,
    onStartMove,
    values,
    draggingIndex,
    ...restProps
  } = props;

  // 以下的 ref 只是为了此处的 focus
  // const handlesRef = React.useRef({});
  // React.useImperativeHandle(ref, () => ({
  //   focus: (index) => {
  //     handlesRef.current[index]?.focus();
  //   },
  // }));

  return (
    <>
      {values.map((value, index) => (
        <Handle
          // ref={(node) => {
          //   if (!node) {
          //     delete handlesRef.current[index];
          //   } else {
          //     handlesRef.current[index] = node;
          //   }
          // }}
          dragging={draggingIndex === index}
          prefixCls={prefixCls}
          style={getIndex(style, index)}
          key={index}
          value={value}
          valueIndex={index}
          onStartMove={onStartMove}
          {...restProps}
        />
      ))}
    </>
  );
});

if (process.env.NODE_ENV !== "production") {
  Handles.displayName = "Handles";
}

export default Handles;
