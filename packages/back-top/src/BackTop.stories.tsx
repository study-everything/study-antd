import React from 'react';
import { storiesOf } from '@storybook/react';
import { BackTop }from './BackTop';

import './style'

// storiesOf('BackTop', module)
//   .add('Basic', () => (
//     <>
//       <div style={{height: '1600px'}}>
//         <p>占位内容</p>
//         <p>占位内容</p>
//         <p>占位内容</p>
//         <p>占位内容</p>
//         <p>占位内容</p>
//         <p>占位内容</p>
//       </div>
//       <BackTop />
//     </>
//   ))

export default {
  title: 'BackTop',
  component: BackTop,
};

export const Basic = () => (
  <>
    <div style={{height: '1600px'}}>
      <p>占位内容</p>
      <p>占位内容</p>
      <p>占位内容</p>
      <p>占位内容</p>
      <p>占位内容</p>
      <p>占位内容</p>
    </div>
    <BackTop />
  </>
)
