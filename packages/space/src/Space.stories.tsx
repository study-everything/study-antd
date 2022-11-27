import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Space, SpaceSize } from './Space';
import { Button, Divider, Input, InputNumber, Radio, Slider, Typography } from 'antd';
import './style';

storiesOf('Space', module)
  .add('基本用法', () => (
    <>
      <Space>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
      </Space>
    </>
  ))
  .add('垂直间距', () => (
    <>
      <Space direction="vertical">
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
      </Space>
    </>
  ))
  .add('间距大小', () => {
    const [size, setSize] = useState<SpaceSize | [SpaceSize, SpaceSize]>('small');
    return (
      <>
        <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
          <Radio value="small">Small</Radio>
          <Radio value="middle">Middle</Radio>
          <Radio value="large">Large</Radio>
        </Radio.Group>
        <br />
        <br />
        <Space size={size}>
          <Button>button</Button>
          <Button>button</Button>
          <Button>button</Button>
        </Space>
      </>
    );
  })
  .add('對齊模式', () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: 'none', margin: '8px 4px', padding: 4, border: '1px solid #40a9ff' }}>
        <Space align="center">
          center
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
      <div style={{ flex: 'none', margin: '8px 4px', padding: 4, border: '1px solid #40a9ff' }}>
        <Space align="start">
          start
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
      <div style={{ flex: 'none', margin: '8px 4px', padding: 4, border: '1px solid #40a9ff' }}>
        <Space align="end">
          end
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
      <div style={{ flex: 'none', margin: '8px 4px', padding: 4, border: '1px solid #40a9ff' }}>
        <Space align="baseline">
          baseline
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
    </div>
  ))
  .add('自定義间距大小', () => {
    const [size, setSize] = useState<number>(8);
    return (
      <>
        <InputNumber value={size} onChange={val => setSize(val)} />
        <br />
        <br />
        <Space size={size}>
          <Button>button</Button>
          <Button>button</Button>
          <Button>button</Button>
        </Space>
      </>
    );
  })
  .add('自動換行', () => (
    <Space size={[8, 16]} wrap>
      {new Array(20).fill(null).map((_, index) => (
        <Button key={index}>Button</Button>
      ))}
    </Space>
  ))
  .add('分隔符', () => (
    <Space split="|">
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
    </Space>
  ));
