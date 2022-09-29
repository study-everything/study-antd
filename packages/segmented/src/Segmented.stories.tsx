import React, { useState } from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

import { storiesOf } from '@storybook/react';
import { Segmented } from './Segmented';
import './style';

storiesOf('Segmented', module)
  .add('Default', () => (
    <Segmented
      options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
      defaultValue="Daily"
      onChange={v => {
        console.log('%c 🥚 v: ', 'font-size:20px;background-color: #ED9EC7;color:#fff;', v);
      }}
    />
  ))
  .add('Block', () => (
    <>
      <div>Box width is 500px.</div>
      <div style={{ width: 500, border: '1px dashed #ccc', padding: 4 }}>
        <Segmented block options={['123', '456', 'longtext-longtext-longtext-longtext']} />
      </div>
    </>
  ))
  .add('Size', () => (
    <>
      <Segmented size="large" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
      <br />
      <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
      <br />
      <Segmented size="small" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    </>
  ))
  .add('OnlyIcon', () => (
    <Segmented
      options={[
        {
          value: 'List',
          icon: <BarsOutlined />,
        },
        {
          value: 'Kanban',
          icon: <AppstoreOutlined />,
        },
      ]}
    />
  ))
  .add('WithIcon', () => (
    <Segmented
      options={[
        {
          label: 'List',
          value: 'List',
          icon: <BarsOutlined />,
        },
        {
          label: 'Kanban',
          value: 'Kanban',
          icon: <AppstoreOutlined />,
        },
      ]}
    />
  ))
  .add('CustomRendering', () => (
    <>
      <Segmented
        options={[
          {
            label: (
              <div style={{ padding: 4 }}>
                <img src="https://joeschmoe.io/api/v1/random" alt="avatar" />
                <div>User 1</div>
              </div>
            ),
            value: 'user1',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <img src="https://joeschmoe.io/api/v1/random" alt="avatar" />
                <div>User 2</div>
              </div>
            ),
            value: 'user2',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <img src="https://joeschmoe.io/api/v1/random" alt="avatar" />
                <div>User 3</div>
              </div>
            ),
            value: 'user3',
          },
        ]}
      />
      <br />
      <Segmented
        options={[
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Spring</div>
                <div>Jan-Mar</div>
              </div>
            ),
            value: 'spring',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Summer</div>
                <div>Apr-Jun</div>
              </div>
            ),
            value: 'summer',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Autumn</div>
                <div>Jul-Sept</div>
              </div>
            ),
            value: 'autumn',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Winter</div>
                <div>Oct-Dec</div>
              </div>
            ),
            value: 'winter',
          },
        ]}
      />
    </>
  ))
  .add('Disabled', () => (
    <>
      <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
      <br />
      <Segmented
        options={[
          'Daily',
          { label: 'Weekly', value: 'Weekly', disabled: true },
          'Monthly',
          { label: 'Quarterly', value: 'Quarterly', disabled: true },
          'Yearly',
        ]}
      />
    </>
  ))
  .add('Controlled', () => {
    const [value, setValue] = useState<string | number>('Weekly');
    return (
      <Segmented
        options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
        defaultValue="Daily"
        value={value}
        onChange={setValue}
      />
    );
  });
