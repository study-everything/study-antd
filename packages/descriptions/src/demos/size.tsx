import React from 'react';
import { Button, Alert } from 'antd';
import type { ComponentStory } from '@storybook/react';
import { Descriptions } from '../Descriptions';

const Size: ComponentStory<typeof Descriptions> = (controlProps) => {
  return (
    <div>
      <Alert
        message="在下方 Control 区域控制"
        type="warning"
      />
      <br />
      <Descriptions {...controlProps}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1<br />
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions {...controlProps}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

Size.storyName = '自定义尺寸';
Size.args = {
  title: 'Custom Size',
  size: 'default',
  bordered: true,
  layout: 'horizontal',
  extra: (<Button type="primary">Edit</Button>),
};
// Size.argTypes = {
//   size: {
//     options: ['default', 'middle', 'small'],
//     control: { type: 'select' },
//   },
// };


export default Size;
