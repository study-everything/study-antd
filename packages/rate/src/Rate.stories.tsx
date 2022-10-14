import React from 'react';
import { storiesOf } from '@storybook/react';
import Rate from './index';
import './style'

storiesOf('Rate', module).add('Demo', () => {
  const handleKey = (e: React.KeyboardEvent) => {
    console.log(e.keyCode, e.code)
  }
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

    return <>
      <Rate allowHalf tooltips={desc} allowClear character="开炮啊" defaultValue={2.5} onKeyDown={handleKey} />
    </> 
  }
)