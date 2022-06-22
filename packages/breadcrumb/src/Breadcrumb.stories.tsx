import React from 'react';
import { storiesOf } from '@storybook/react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Menu } from 'antd';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import './style'
import './Breadcrumb.stories.less'

storiesOf('Breadcrumb', module).add('basic', () => (	
	<Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Application Center</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Application List</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
)).add('icon', () => (
  <Breadcrumb>
    <Breadcrumb.Item href="http://baidu.com">
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item href="a.com">
      <UserOutlined />
      <span>Application List</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Application</Breadcrumb.Item>
  </Breadcrumb>
)).add('router', () => {
  const Apps = () => (
    <ul className="app-list">
      <li>
        <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
      </li>
      <li>
        <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
      </li>
    </ul>
  );
  
  const breadcrumbNameMap: Record<string, string> = {
    '/apps': 'Application List',
    '/apps/1': 'Application1',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail',
  };
  
  const Home = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
  
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });
  
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
  
    return (
      <div className="demo">
        <div className="demo-nav">
          <Link to="/">Home</Link>
          <Link to="/apps">Application List</Link>
        </div>
        <Routes>
          <Route path="/apps" element={<Apps />} />
          <Route path="*" element={<span>Home Page</span>} />
        </Routes>
        <Alert style={{ margin: '16px 0' }} message="Click the navigation above to switch:" />
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>
    );
  };
  
  const App: React.FC = () => (
    <HashRouter>
      <Home />
    </HashRouter>
  );
  return <App />
}).add('separator', () => (
  <Breadcrumb separator=">">
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
)).add('sep', () => (
  <Breadcrumb separator="">
    <Breadcrumb.Item>Location</Breadcrumb.Item>
    <Breadcrumb.Separator>:</Breadcrumb.Separator>
    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
)).add('menu', () => {
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              General
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
              Layout
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              Navigation
            </a>
          ),
        },
      ]}
    />
  );
  
  const App: React.FC = () => (
    <Breadcrumb>
      <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Component</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item overlay={menu}>
        <a href="">General</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Button</Breadcrumb.Item>
    </Breadcrumb>
  );
  return <App />
})