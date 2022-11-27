
import React from "react";
import classNames from 'classname';
import RowContext from './RowContext';
import ResponsiveObserve, { responsiveArray, ConfigContext } from './utils'

import type { Breakpoint, ScreenMap } from './utils';

const tuple = <T extends string[]>(...args: T) => args;
const RowAligns = tuple('top', 'middle', 'bottom', 'stretch');
const RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between', 'space-evenly');

type Gap = number | undefined;
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;
interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter];
  align?: typeof RowAligns[number];
  justify?: typeof RowJustify[number];
  prefixCls?: string;
  wrap?: boolean;
}



const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, className, style, align, gutter, justify, wrap, children, ...others } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const [screens, setScreens] = React.useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });

  const gutterRef = React.useRef<Gutter | [Gutter, Gutter]>(gutter);

  React.useEffect(() => {
    const token = ResponsiveObserve.subscribe(screen => {
      const currentGutter = gutterRef.current || 0;
      if (
        (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
        (Array.isArray(currentGutter) &&
          (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'))
      ) {
        setScreens(screen);
      }
    });
    return () => ResponsiveObserve.unsubscribe(token);
  }, []);


  const prefixCls = getPrefixCls('row', customizePrefixCls);
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${justify}`]: justify,
      [`${prefixCls}-${align}`]: align,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className)
  const getGutter = (): [Gap, Gap] => {
    const results: [Gap, Gap] = [undefined, undefined];
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, undefined];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint] as number;
            break;
          }
        }
      } else {
        results[index] = g;
      }
    });
    return results;
  };
  const gutters = getGutter();
  const [gutterH, gutterV] = gutters;
  const rowContext = React.useMemo(
    () => ({ gutter: [gutterH, gutterV] as [number, number], wrap }),
    [gutterH, gutterV, wrap],
  );
  
  return (
    <RowContext.Provider value={rowContext}>
      <div ref={ref} className={classes} style={{...style}} {...others}>
        { children }
      </div>
    </RowContext.Provider>
  )
})

export default Row;