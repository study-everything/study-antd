import React, { HTMLAttributes, useContext } from 'react';
import { SpaceContext } from './Space';

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  className: string;
  children: React.ReactNode;
  index: number;
  direction?: 'horizontal' | 'vertical';
  split?: string | React.ReactNode;
  wrap?: boolean;
}

const Item = (props: ItemProps) => {
  const { className, children, index, split } = props;
  const { horizontalSize, verticalSize, latestIndex } = useContext(SpaceContext);

  if (children === null || children === undefined) {
    return null;
  }

  let style: React.CSSProperties = {};
  /**
  源碼中這裏判斷了當前瀏覽器是否支持flex佈局，如果不支持做了樣式上的兼容處理
  */
  // if (!supportFlexGap) {
  //   if (direction === 'vertical') {
  //     if (index < latestIndex) {
  //       style = { marginBottom: horizontalSize / (split ? 2 : 1) };
  //     }
  //   } else {
  //     style = {
  //       ...(index < latestIndex && { [marginDirection]: horizontalSize / (split ? 2 : 1) }),
  //       ...(wrap && { paddingBottom: verticalSize }),
  //     };
  //   }
  // }
  return (
    <>
      <div className={className} style={style}>
        {children}
      </div>
      {index < latestIndex && split && (
        <span className={`${className}-split`} style={style}>
          {split}
        </span>
      )}
    </>
  );
};

export default Item;
