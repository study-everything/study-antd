import * as React from 'react';
import classNames from 'classnames';

type widthUnit = number | string;

export interface SkeletonParagraphProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: widthUnit | Array<widthUnit>;
  rows?: number;
}

const Paragraph = (props: SkeletonParagraphProps) => {
  const getWidth = (index: number) => {
    const { width, rows = 2 } = props;
    if (Array.isArray(width)) {
      return width[index];  // 可单独设置每一行的宽度
    }
    // last paragraph
    if (rows - 1 === index) {
      return width;
    }
    return undefined;
  };
  const { prefixCls, className, style, rows } = props;
  const rowList = [...Array(rows)].map((_, index) => (
    <li key={index} style={{ width: getWidth(index) }} />
  ));
  return (
    <ul className={classNames(prefixCls, className)} style={style}>
      {rowList}
    </ul>
  );
};

export default Paragraph;
