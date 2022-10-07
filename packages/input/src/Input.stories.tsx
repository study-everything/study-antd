import React, { useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { storiesOf } from '@storybook/react';
import { Button } from 'antd';
import Input from './index';
import type { InputRef } from './index';

storiesOf('Input', module)
  .add('basic', () => (
    <p>
      <Input placeholder="Basic usage" />
    </p>
  ))
  .add('size', () => (
    <>
      <p>
        <span>small:</span>
        <Input size="small" placeholder="small" />
      </p>
      <p>
        <span>middle:</span>
        <Input size="middle" placeholder="middle" />
      </p>
      <p>
        <span>large:</span>
        <Input size="large" placeholder="large" />
      </p>
    </>
  ))
  .add('prefix&suffix', () => (
    <>
      <p>
        <span>prefix:</span>
        <Input placeholder="prefix" prefix={<UserOutlined />} />
      </p>
      <p>
        <span>suffix:</span>
        <Input placeholder="suffix" suffix={<UserOutlined />} />
      </p>
    </>
  ))
  .add('addonBefore&addonAfter', () => (
    <>
      <p>
        <span>addonBefore:</span>
        <Input placeholder="addonBefore" addonBefore="I'am" defaultValue="input" />
      </p>
      <p>
        <span>addonAfter:</span>
        <Input placeholder="addonAfter" defaultValue="input" addonAfter="is me" />
      </p>
    </>
  ))
  .add('showCount&maxLength', () => (
    <p>
      <span>showCount&maxLength:</span>
      <Input showCount maxLength={15} />
    </p>
  ))
  .add('allowClear', () => (
    <p>
      <span>allowClear:</span>
      <Input allowClear placeholder='allowClear' defaultValue="click right side ✖ icon to clear" />
    </p>
  ))
  .add('status', () => (
    <>
      <p>
        <span>warning:</span>
        <Input allowClear defaultValue="warning" status="warning" />
      </p>
      <p>
        <span>error:</span>
        <Input allowClear defaultValue="error" status="error" />
      </p>
    </>
  ))
  .add('bordered', () => (
    <>
      <p>
        <span>bordered:</span>
        <Input allowClear placeholder="bordered" defaultValue="bordered" bordered />
      </p>
      <p>
        <span>error:</span>
        <Input allowClear placeholder="borderless" defaultValue="borderless" bordered={false} />
      </p>
    </>
  ))
  .add('focused', () => {
    const inputRef = useRef<InputRef>(null);
    return (
      <>
        <p>
          <Button
            onClick={() => {
              inputRef.current!.focus({
                cursor: 'start',
              });
            }}
          >
            Focus at first
          </Button>
          <Button
            onClick={() => {
              inputRef.current!.focus({
                cursor: 'end',
              });
            }}
          >
            Focus at last
          </Button>
          <Button
            onClick={() => {
              inputRef.current!.focus({
                cursor: 'all',
              });
            }}
          >
            Focus to select all
          </Button>
        </p>
        <p>
          <Input allowClear placeholder="focus" defaultValue="focus" ref={inputRef} />
        </p>
      </>
    );
  });
// status
