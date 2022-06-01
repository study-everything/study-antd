import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import type { CarouselRef } from './Carousel';
import Carousel from './Carousel';
import './style';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  margin: 0,
};

storiesOf('Carousel', module).add('Demo', () => {
  const ref = useRef<CarouselRef>(null);
  const [position, setPosition] = useState<'left' | 'right' | 'bottom' | 'top'>('bottom');
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div style={{ width: 300, overflow: 'hidden' }}>
      <div>
        <button onClick={() => ref.current.goTo(0, true)} type="button">
          回到0
        </button>
        <button onClick={() => ref.current.prev()} type="button">
          上一个
        </button>
        <button onClick={() => ref.current.next()} type="button">
          下一个
        </button>

        <div>
          {['top', 'bottom', 'left', 'right'].map(p => (
            // @ts-ignore
            <button type="button" key={p} onClick={() => setPosition(p)}>
              指示器位置{p}
            </button>
          ))}
        </div>
      </div>
      <Carousel
        afterChange={onChange}
        ref={ref}
        dotPosition={position}
        autoplay={false}
        easing="ease-in"
      >
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  );
});
