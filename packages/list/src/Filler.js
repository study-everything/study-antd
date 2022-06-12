/*
 * @Author: dfh
 * @Date: 2022-06-05 13:11:30
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import * as React from 'react';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';

const Filler = React.forwardRef(({
  height,
  offset,
  children,
  prefixCls,
  onInnerResize
}, ref) => {
  let outerStyle = {};
  let innerStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  if (offset !== undefined) {
    outerStyle = {
      height,
      position: 'relative',
      overflow: 'hidden'
    };
    innerStyle = { ...innerStyle,
      transform: `translateY(${offset}px)`,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0
    };
  }

  return (<div style={outerStyle}>
        <ResizeObserver onResize={({
      offsetHeight
    }) => {
      if (offsetHeight && onInnerResize) {
        onInnerResize();
      }
    }}>
          <div style={innerStyle} className={classNames({
        [`${prefixCls}-holder-inner`]: prefixCls
      })} ref={ref}>
            {children}
          </div>
        </ResizeObserver>
      </div>);
});
Filler.displayName = 'Filler';
export default Filler;