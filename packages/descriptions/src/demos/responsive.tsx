import React from 'react';
import { Alert } from 'antd';
import type { ComponentStory } from '@storybook/react';
import { Descriptions } from '../Descriptions';

const Responsive: ComponentStory<typeof Descriptions> = (controlProps) => (
  <>
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
        Region: East China 1
      </Descriptions.Item>
    </Descriptions>
  </>
);

Responsive.storyName = '响应式';
Responsive.args = {
  title: 'Responsive Descriptions',
  bordered: true,
  column: { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 },
};

export default Responsive;
