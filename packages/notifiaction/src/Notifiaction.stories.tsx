import React from 'react';
import { storiesOf } from '@storybook/react';
import useNotification from '.';
import { Button } from 'antd';
import './style';

storiesOf('Message', module)
  .add('basic', () => {
    const [api, ContainerContext] = useNotification();
    const info = () => {
      api.success({ message: '这是最基本的' });
    };
    return (
      <>
        {ContainerContext}
        <Button onClick={info}>basis notification</Button>
      </>
    );
  })
  .add('duration', () => {
    const [api, ContainerContext] = useNotification();
    const info = () => {
      api.success({ message: '可以控制时间的', duration: 2000 });
    };
    return (
      <>
        {ContainerContext}
        <Button onClick={info}>notification description</Button>
      </>
    );
  })
  .add('onClose', () => {
    const [api, ContainerContext] = useNotification();
    const info = () => {
      api.success({
        message: '点击关闭回调',
        onClose: () => {
          alert('close');
        },
      });
    };
    return (
      <>
        {ContainerContext}
        <Button onClick={info}>notification closed</Button>
      </>
    );
  });
