import React from 'react';
import { storiesOf } from '@storybook/react';
import message from './Message';
import './style';

storiesOf('Message', module).add('Demo', () => {
  const handleClick = () => {
    message
      .success({
        content: '1111',
        container: document.querySelector('html'),
        duration: 0,
      })
      .then(() => message.error('Loading finished'));
  };
  return (
    <>
      <button onClick={handleClick}>message</button>
    </>
  );
});
