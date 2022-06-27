/*
 * @Descripttion:
 * @Author: ziwei
 * @Date: 2022-06-26 15:53:32
 * @LastEditors: ziwei
 * @LastEditTime: 2022-06-26 19:30:29
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import Result from './Result';
import './style';

const { Paragraph, Text } = Typography;

storiesOf('Result', module)
  .add('403', () => (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  ))
  .add('404', () => (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  ))
  .add('500', () => (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary">Back Home</Button>}
    />
  ))
  .add('customIcon', () => (
    <Result
      icon={<SmileOutlined />}
      title="Great, we have done all the operations!"
      extra={<Button type="primary">Next</Button>}
    />
  ))
  .add('error', () => (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
          frozen. <a>Thaw immediately &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
          eligible to apply. <a>Apply Unlock &gt;</a>
        </Paragraph>
      </div>
    </Result>
  ))
  .add('info', () => (
    <Result
      title="Your operation has been executed"
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  ))
  .add('success', () => (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
  ))
  .add('warning', () => (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  ));
