import React from 'react';
import { Alert } from 'antd';
import type { ComponentStory } from '@storybook/react';
import { Descriptions } from '../Descriptions';

const Vertical: ComponentStory<typeof Descriptions> = (controlProps) => (
  <>
    <Alert
      message="在下方 Control 区域控制"
      type="warning"
    />
    <br />
    <Descriptions {...controlProps}>
      <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
      <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
      <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
      <Descriptions.Item
        label="Address"
        span={2}
      >
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
      <Descriptions.Item label="Remark">empty</Descriptions.Item>
    </Descriptions>
  </>
);

Vertical.storyName = '垂直';
Vertical.args = {
  title: 'User Info',
  layout: 'vertical',
};

export default Vertical;
