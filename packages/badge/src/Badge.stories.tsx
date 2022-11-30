import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Avatar, Space } from 'antd';
import { Badge } from './Badge';
import './style';

storiesOf('Badge', module).add('Demo', () => (
  <>
    <Badge />
    <Space size="large">
      <Badge.Ribbon text="Hippies">
        <Card title="Pushes open the window" size="small">
          and raises the spyglass.
        </Card>
      </Badge.Ribbon>
      <Badge count={5}>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={0} showZero>
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
    <div>
      <Badge count={25} />
    </div>
  </>
));
