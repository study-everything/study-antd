import React from 'react';
import type { PropsWithChildren, CSSProperties } from 'react';
import classNames from 'classnames';

interface CarouselItemProps {
  prefixCls: string;
  style: CSSProperties;
}

export default function CarouselItem(props: PropsWithChildren<CarouselItemProps>) {
  const { prefixCls = 'ant' } = props;

  return (
    <div
      className={classNames({
        [`${prefixCls}-carousel-item`]: true,
      })}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
