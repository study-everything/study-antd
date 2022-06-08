import React from 'react';
import {  message, Button, Switch } from 'antd';
import { storiesOf } from '@storybook/react';
import { Popconfirm }from './popconfirm';
import './style'

storiesOf('Popconfirm', module).add('basic', () => {
	const confirm = (e: React.MouseEvent<HTMLElement>) => {
		console.log(e);
		message.success('Click on Yes');
	};
	
	const cancel = (e: React.MouseEvent<HTMLElement>) => {
		console.log(e);
		message.error('Click on No');
	};
	return (
		<Popconfirm
		title="Are you sure to delete this task?"
		onConfirm={confirm}
		onCancel={cancel}
		okText="Yes"
		cancelText="No"
		>
			<a href="#">Delete</a>
		</Popconfirm>
	)
}).add('promise', () => {
	const confirm = () =>
    new Promise(resolve => {
      setTimeout(() => resolve(null), 3000);
    });

    return (
		<Popconfirm
		title="Title"
		onConfirm={confirm}
		onVisibleChange={() => console.log('visible change')}
		>
		<Button type="primary">Open Popconfirm with Promise</Button>
		</Popconfirm>
	);
}).add('position', () => {
	const text = 'Are you sure to delete this task?';

	const confirm = () => {
	message.info('Clicked on Yes.');
	};

	return (
		<div className="demo">
		  <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
			<Popconfirm placement="topLeft" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
			  <Button>TL</Button>
			</Popconfirm>
			<Popconfirm placement="top" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
			  <Button>Top</Button>
			</Popconfirm>
			<Popconfirm
			  placement="topRight"
			  title={text}
			  onConfirm={confirm}
			  okText="Yes"
			  cancelText="No"
			>
			  <Button>TR</Button>
			</Popconfirm>
		  </div>
		  <div style={{ width: 70, float: 'left' }}>
			<Popconfirm placement="leftTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
			  <Button>LT</Button>
			</Popconfirm>
			<Popconfirm placement="left" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
			  <Button>Left</Button>
			</Popconfirm>
			<Popconfirm
			  placement="leftBottom"
			  title={text}
			  onConfirm={confirm}
			  okText="Yes"
			  cancelText="No"
			>
			  <Button>LB</Button>
			</Popconfirm>
		  </div>
		  <div style={{ width: 70, marginLeft: 304 }}>
			<Popconfirm
			  placement="rightTop"
			  title={text}
			  onConfirm={confirm}
			  okText="Yes"
			  cancelText="No"
			>
			  <Button>RT</Button>
			</Popconfirm>
			<Popconfirm placement="right" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
			  <Button>Right</Button>
			</Popconfirm>
			<Popconfirm
			  placement="rightBottom"
			  title={text}
			  onConfirm={confirm}
			  okText="Yes"
			  cancelText="No"
			>
			  <Button>RB</Button>
			</Popconfirm>
		  </div>
		  <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
			<Popconfirm
			  placement="bottomLeft"
			  title={text}
			  onConfirm={confirm}
			  okText="Yes"
			  cancelText="No"
			>
			  <Button>BL</Button>
			</Popconfirm>
			<Popconfirm placement="bottom" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
			  <Button>Bottom</Button>
			</Popconfirm>
			<Popconfirm
			  placement="bottomRight"
			  title={text}
			  onConfirm={confirm}
			  okText="Yes"
			  cancelText="No"
			>
			  <Button>BR</Button>
			</Popconfirm>
		  </div>
		</div>
	  );
}).add('Conditional trigger', () => {
	const [visible, setVisible] = React.useState(false);
  const [condition, setCondition] = React.useState(true);

  const changeCondition = (checked: boolean) => {
    setCondition(checked);
  };

  const confirm = () => {
    setVisible(false);
    message.success('Next step.');
  };

  const cancel = () => {
    setVisible(false);
    message.error('Click on cancel.');
  };

  const handleVisibleChange = (newVisible: boolean) => {
    if (!newVisible) {
      setVisible(newVisible);
      return;
    }
    // Determining condition before show the popconfirm.
    console.log(condition);
    if (condition) {
      confirm(); // next step
    } else {
      setVisible(newVisible);
    }
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure delete this task?"
        visible={visible}
        onVisibleChange={handleVisibleChange}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">Delete a task</a>
      </Popconfirm>
      <br />
      <br />
      Whether directly execute：
      <Switch defaultChecked onChange={changeCondition} />
    </div>
  );
})