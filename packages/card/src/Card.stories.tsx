import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from './Card';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './style';

storiesOf('Card', module)
  .add('basic', () => (
    <>
      <Card title='Basic card' extra={<a href='#'>More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <p />
      <Card title='Small size card' size='small' extra={<a href='#'>More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  ))
  .add('No border', () => (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Card title='Card title' bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  ))
  .add('Simple card', () => (
    <>
      <Card style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  ))
  .add('Loading card', () => (
    <>
      <Card style={{ width: 300 }} loading={true}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  )).add('Support more content configuration', () => (
  <>
    <Card
      style={{ width: 300 }}
      actions={[
        <SettingOutlined key='setting' />,
        <EditOutlined key='edit' />,
        <EllipsisOutlined key='ellipsis' />,
      ]}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </>
));
