import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Descriptions, Tag } from 'antd';
import { PageHeader } from './PageHeader';
import './style';

storiesOf('PageHeader', module)
  .add('basic', () => (
    <div>
      <PageHeader
        title="111"
        onBack={() => {
          alert('返回');
        }}
        subTitle="this is page-header"
        className="page-header-border"
      />
    </div>
  ))
  .add('renderChildren', () => (
    <div>
      <PageHeader
        title="111"
        onBack={() => null}
        subTitle="this is page-header"
        className="page-background-color"
        extra={[
          <Button key="3">right 1</Button>,
          <Button key="2">right 2</Button>,
          <Button key="1" type="primary">
            right 3
          </Button>,
        ]}>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created"> 嘿,李兰妈妈 </Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>明天不下雨</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Remarks">如果你也可以这样嗨</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  ))
  .add('allAbility', () => (
    <div>
      <PageHeader
        title="带footer"
        onBack={() => {
          alert('返回');
        }}
        subTitle="this is page-header"
        tags={<Tag color="blue">准备..</Tag>}
        footer={<div>天气好去捕鱼,明天上课不听课</div>}
        extra={[
          <Button key="3">right 1</Button>,
          <Button key="2">right 2</Button>,
          <Button key="1" type="primary">
            right 3
          </Button>,
        ]}>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created"> 嘿,李兰妈妈 </Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>明天不下雨</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Remarks">如果你也可以这样嗨</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  ));
