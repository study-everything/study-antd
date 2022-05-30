import classNames from 'classnames';
import React from 'react';
import useEvent from './hooks/useEvent';

export default function CarouselDot(props: {
  length: number;
  prefixCls: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  current: number;
  onChange: (current: number) => void;
  className: string;
}) {
  const handleClick = useEvent((next: number) => {
    props.onChange(next);
  });

  return (
    <div
      className={classNames(
        `${props.prefixCls}-carousel-dot`,
        `${props.prefixCls}-carousel-dot-${props.position}`,
        props.className,
      )}
    >
      {new Array(props.length).fill(0).map((_, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={handleClick.bind(null, index)}
          className={classNames(`${props.prefixCls}-carousel-dot_item`, {
            [`${props.prefixCls}-carousel-dot_item--active`]: props.current === index,
          })}
        />
      ))}
    </div>
  );
}
