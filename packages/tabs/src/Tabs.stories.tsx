import React from 'react';
import { storiesOf } from '@storybook/react';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

import Tabs from './Tabs';

import './style';

const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};
const defaultTabs = () => (
  <Tabs defaultActiveKey="1" onChange={onChange}>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);
const defaultTabsCard = () => (
  <Tabs defaultActiveKey="1" type="card">
    <TabPane tab="Card Tab 1" key="1">
      Content of card tab 1
    </TabPane>
    <TabPane tab="Card Tab 2" key="2">
      Content of card tab 2
    </TabPane>
    <TabPane tab="Card Tab 3" key="3">
      Content of card tab 3
    </TabPane>
  </Tabs>
);
const tabswithIcon = () => (
  <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
          <AppleOutlined />
          Tab 1
        </span>
      }
      key="1"
    >
      Tab 1
    </TabPane>
    <TabPane
      tab={
        <span>
          <AndroidOutlined />
          Tab 2
        </span>
      }
      key="2"
    >
      Tab 2
    </TabPane>
  </Tabs>
);

storiesOf('Tabs', module)
  .add('default Tabs', defaultTabs)
  .add('Tabs Card', defaultTabsCard)
  .add('Tabs Icon', tabswithIcon);
