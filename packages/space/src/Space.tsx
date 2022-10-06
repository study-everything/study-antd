import React, { HTMLAttributes, createContext, useMemo, ReactNode } from 'react';
import classNames from 'classnames';
import Item from './Item';

type SizeType = 'small' | 'middle' | 'large' | undefined;

export type SpaceSize = SizeType | number;

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode;
  wrap?: boolean;
}

export const SpaceContext = createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
});

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

const getNumberSize = (size: SpaceSize) => {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
};

export const Space: React.FC<SpaceProps> = props => {
  const {
    prefixCls = 'ant-space',
    className,
    size = 'small',
    style,
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    children,
    ...restProps
  } = props;

  const [horizontalSize, verticalSize] = useMemo(
    () => (Array.isArray(size) ? size : [size, size]).map(it => getNumberSize(it)),
    [size],
  );
  const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  const childNodes = Array.from(children as ReactNode[]);
  const cn = classNames(
    prefixCls,
    `${prefixCls}-${direction}`,
    {
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );
  const itemClassName = `${prefixCls}-item`;

  // 計算最後一個子節點位置
  let latestIndex = 0;
  const nodes = childNodes.map((child, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }
    const key = `${itemClassName}-${i}`;
    return (
      <Item
        className={itemClassName}
        key={key}
        direction={direction}
        index={i}
        split={split}
        wrap={wrap}
      >
        {child}
      </Item>
    );
  });

  const spaceContext = useMemo(
    () => ({ horizontalSize, verticalSize, latestIndex }),
    [horizontalSize, verticalSize, latestIndex],
  );

  if (childNodes.length === 0) {
    return null;
  }

  const gapStyle: React.CSSProperties = {
    columnGap: horizontalSize,
    rowGap: verticalSize,
  };
  if (wrap) {
    gapStyle.flexWrap = 'wrap';
    // 如果瀏覽器不支持flex佈局的話，做了兼容處理
    // if (!supportFlexGap) {
    //   gapStyle.marginBottom = -verticalSize;
    // }
  }

  return (
    <div
      className={cn}
      style={{
        ...gapStyle,
        ...style,
      }}
      {...restProps}
    >
      <SpaceContext.Provider value={spaceContext}>{nodes}</SpaceContext.Provider>
    </div>
  );
};
