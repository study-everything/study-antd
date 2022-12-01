import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Avatar, Col, Divider, Row, Switch, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge } from './Badge';
import './style';
import './style/story.less';

storiesOf('Badge', module).add('Demo', () => {
  const [show, setShow] = useState(true);
  const colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
  ];
  return (
    <>
      <Divider orientation="left">基本</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={0} showZero>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
      </Row>

      <Divider orientation="left">独立使用</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Switch checked={show} onChange={() => setShow(!show)} />
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={show ? 25 : 0} />
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={show ? <ClockCircleOutlined style={{ color: '#f5222d' }} /> : 0} />
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge
            className="site-badge-count-109"
            count={show ? 109 : 0}
            style={{ backgroundColor: '#52c41a' }}
          />
        </Col>
      </Row>

      <Divider orientation="left">状态点</Divider>
      <div>
        <Space>
          <Badge status="success" />
          <Badge status="error" />
          <Badge status="default" />
          <Badge status="processing" />
          <Badge status="warning" />
        </Space>
        <br />
        <Space direction="vertical">
          <Badge status="success" text="Success" />
          <Badge status="error" text="Error" />
          <Badge status="default" text="Default" />
          <Badge status="processing" text="Processing" />
          <Badge status="warning" text="Warning" />
        </Space>
      </div>

      <Divider orientation="left">偏移</Divider>
      <div>
        <Badge count={5} offset={[10, 10]}>
          <Avatar shape="square" size="large" />
        </Badge>
      </div>

      <Divider orientation="left">大小</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Badge size="default" count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge size="small" count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
      </Row>

      <Divider orientation="left">绸带</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Badge.Ribbon text="Hippies">
            <Card title="Pushes open the window" size="small">
              and raises the spyglass.
            </Card>
          </Badge.Ribbon>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge.Ribbon text="Hippies" color="pink">
            <Card title="Pushes open the window" size="small">
              and raises the spyglass.
            </Card>
          </Badge.Ribbon>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge.Ribbon text="Hippies" color="red">
            <Card title="Pushes open the window" size="small">
              and raises the spyglass.
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row>

      <Divider orientation="left">Presets</Divider>
      <Space direction="vertical">
        {colors.map(color => (
          <Badge key={color} color={color} text={color} />
        ))}
      </Space>
      <Divider orientation="left">Custom</Divider>
      <Space direction="vertical">
        <Badge color="#f50" text="#f50" />
        <Badge color="rgb(45, 183, 245)" text="rgb(45, 183, 245)" />
        <Badge color="hsl(102, 53%, 61%)" text="hsl(102, 53%, 61%)" />
        <Badge color="hwb(205 6% 9%)" text="hwb(205 6% 9%)" />
      </Space>
    </>
  );
});
