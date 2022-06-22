import React from 'react';
import { Button, Alert } from 'antd';
import type { ComponentStory } from '@storybook/react';
import { Descriptions } from '../Descriptions';

const Basic: ComponentStory<typeof Descriptions> = (controlProps) => (
  <>
    <Alert
      message="在下方 Control 区域控制"
      type="warning"
    />
    <br />
    <Descriptions {...controlProps}>
      <Descriptions.Item
        label="UserName"
        span={3}
        labelStyle={{ backgroundColor: 'yellow' }}
      >Zhou Maomao
      </Descriptions.Item>
      <Descriptions.Item label="Telephone">1810000000
      </Descriptions.Item>
      <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
      <Descriptions.Item label="Remark">empty</Descriptions.Item>
      <Descriptions.Item label="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
    </Descriptions>
  </>
);

Basic.storyName = '基本';
Basic.args = {
  labelStyle: { backgroundColor: 'red' },
  title: '这是个标题',
  extra: (<Button>这是额外的按钮</Button>),
};

export default Basic;
