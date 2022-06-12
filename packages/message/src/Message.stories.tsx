import React from 'react';
import { storiesOf } from '@storybook/react';
import message from './Message';
import { Button } from 'antd';
import './style';

storiesOf('Message', module)
  .add('basic', () => {
    const info = () => {
      message.info('This is a normal message');
    };
    return (
      <>
        <Button onClick={info}>display normal message</Button>
      </>
    );
  })
  .add('types', () => {
    const success = () => {
      message.success('This is a success message');
    };
    const error = () => {
      message.error('This is a error message');
    };
    const warning = () => {
      message.warning('This is a warning message');
    };
    return (
      <>
        <Button onClick={success}>success</Button>
        <Button onClick={error}>error</Button>
        <Button onClick={warning}>warning</Button>
      </>
    );
  })
  .add('duration', () => {
    const success = () => {
      message.success(
        'This is a prompt message for success, and it will disappear in 10 seconds',
        10,
      );
    };
    return (
      <>
        <Button onClick={success}>Customized display duration</Button>
      </>
    );
  })
  .add('loading', () => {
    const loading = () => {
      const hide = message.loading('Action in progress..', 0);
      // Dismiss manually and asynchronously
      setTimeout(hide, 2500);
    };
    return (
      <>
        <Button onClick={loading}>Display a loading indicator</Button>
      </>
    );
  })
  .add('promise', () => {
    const loading = () => {
      message
        .loading('Action in progress..', 2.5)
        .then(() => message.success('Loading finished', 2.5))
        .then(() => message.info('Loading finished is finished', 2.5));
    };
    return (
      <>
        <Button onClick={loading}>Display sequential messages</Button>
      </>
    );
  })
  .add('update by key', () => {
    const key = 'updatable';
    const loading = () => {
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.success({ content: 'Loaded!', key, duration: 2 });
      }, 1000);
    };
    return (
      <>
        <Button onClick={loading}> Open the message box</Button>
      </>
    );
  })
  .add('style', () => {
    const loading = () => {
      message.success({
        content: 'This is a prompt message with custom className and style',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    };
    return (
      <>
        <Button onClick={loading}>Customized style</Button>
      </>
    );
  });
