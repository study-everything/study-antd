import React from 'react';
import { storiesOf } from '@storybook/react';
import { Collapse }from './Collapse';
import './style'

const { Panel } = Collapse;

storiesOf('Collapse', module).add('Basic', () => {
	const text = `
		This is panel text.
	`;
	const onChange = (key: string | string[]) => {
    console.log('onChange', key);
  };
	return (
		<Collapse defaultActiveKey={['1']} onChange={ onChange }>
			<Panel header="This is panel header 1" key="1">
				<p>{text}</p>
			</Panel>
			<Panel header="This is panel header 2" key="2">
				<p>{text}</p>
			</Panel>
			<Panel header="This is panel header 3" key="3">
				<p>{text}</p>
			</Panel>
		</Collapse>
	)
}).add('accordion', () => {
	const text = `
		This is panel text.
	`;
	return (
		<Collapse accordion>
			<Panel header="This is panel header 1" key="1">
				<p>{text}</p>
			</Panel>
			<Panel header="This is panel header 2" key="2">
				<p>{text}</p>
			</Panel>
			<Panel header="This is panel header 3" key="3">
				<p>{text}</p>
			</Panel>
		</Collapse>
	)
}).add('collapsible', () => {
	const text = `
		This is panel text.
	`;
	return (
		<div>
			<Collapse collapsible="header" defaultActiveKey={['1']}>
				<Panel header="This panel can only be collapsed by clicking text" key="1">
					<p>{text}</p>
				</Panel>
			</Collapse>
			<Collapse collapsible="disabled">
				<Panel header="This panel can't be collapsed" key="2">
					<p>{text}</p>
				</Panel>
			</Collapse>
		</div>
	)
}).add('nested', () => {
	const text = `
		This is panel text.
	`;
	const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse onChange={onChange}>
      <Panel header="This is panel header 1" key="1">
        <Collapse defaultActiveKey="1">
          <Panel header="This is panel nest panel" key="1">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
}).add('isShowArrow', () => {
	const text = `
		This is panel text.
	`;
	return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="This is panel header with arrow icon" key="1">
        <p>{text}</p>
      </Panel>
      <Panel showArrow={false} header="This is panel header with no arrow icon" key="2">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
}).add('borderless', () => {
	const text = `
		This is panel text.
	`;
	return (
		<Collapse bordered={false} defaultActiveKey={['1']}>
			<Panel header="This is panel header 1" key="1">
				{text}
			</Panel>
			<Panel header="This is panel header 2" key="2">
				{text}
			</Panel>
			<Panel header="This is panel header 3" key="3">
				{text}
			</Panel>
		</Collapse>
	)
})