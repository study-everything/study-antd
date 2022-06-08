import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { SearchOutlined, DownloadOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import type { SizeType } from './button';
import Button from './button';
import './style';
import './Button.stories.less';
import type { ButtonGroupProps } from './button-group';

storiesOf('Button', module)
  .add('basic', () => (
    <>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </>
  ))
  .add('block', () => (
    <>
      <Button type="primary" block>
        Primary
      </Button>
      <Button block>Default</Button>
      <Button type="dashed" block>
        Dashed
      </Button>
      <Button type="link" block>
        Link
      </Button>
    </>
  ))
  .add('danger', () => (
    <>
      <Button type="primary" danger>
        Primary
      </Button>
      <Button danger>Default</Button>
      <Button type="dashed" danger>
        Dashed
      </Button>
      <Button type="text" danger>
        Text
      </Button>
      <Button type="link" danger>
        Link
      </Button>
    </>
  ))
  .add('disabled', () => (
    <>
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>
        Primary(disabled)
      </Button>
      <br />
      <Button>Default</Button>
      <Button disabled>Default(disabled)</Button>
      <br />
      <Button type="dashed">Dashed</Button>
      <Button type="dashed" disabled>
        Dashed(disabled)
      </Button>
      <br />
      <Button type="text">Text</Button>
      <Button type="text" disabled>
        Text(disabled)
      </Button>
      <br />
      <Button type="link">Link</Button>
      <Button type="link" disabled>
        Link(disabled)
      </Button>
      <br />
      <Button danger>Danger Default</Button>
      <Button danger disabled>
        Danger Default(disabled)
      </Button>
      <br />
      <Button danger type="text">
        Danger Text
      </Button>
      <Button danger type="text" disabled>
        Danger Text(disabled)
      </Button>
      <br />
      <Button type="link" danger>
        Danger Link
      </Button>
      <Button type="link" danger disabled>
        Danger Link(disabled)
      </Button>
      <div className="site-button-ghost-wrapper">
        <Button ghost>Ghost</Button>
        <Button ghost disabled>
          Ghost(disabled)
        </Button>
      </div>
    </>
  ))
  .add('ghost', () => (
    <div className="ghost-wrapper">
      <Button type="primary" ghost>
        Primary
      </Button>
      <Button ghost>Default</Button>
      <Button type="dashed" ghost>
        Dashed
      </Button>
      <Button type="primary" danger ghost>
        Danger
      </Button>
    </div>
  ))
  .add('icon', () => (
      <>
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        <Button type="primary" shape="circle">
          A
        </Button>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
        <Button shape="circle" icon={<SearchOutlined />} />
        <Button icon={<SearchOutlined />}>Search</Button>
        <br />
        <Button shape="circle" icon={<SearchOutlined />} />
        <Button icon={<SearchOutlined />}>Search</Button>
        <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
        <Button type="dashed" icon={<SearchOutlined />}>
          Search
        </Button>
        <Button icon={<SearchOutlined />} href="https://www.google.com" />
        <br />
        <br />
        <Button type="primary" shape="circle" icon={<SearchOutlined />} size="large" />
        <Button type="primary" shape="circle" size="large">
          A
        </Button>
        <Button type="primary" icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <Button shape="circle" icon={<SearchOutlined />} size="large" />
        <Button icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <br />
        <Button shape="circle" icon={<SearchOutlined />} size="large" />
        <Button icon={<SearchOutlined />} size="large">
          Search
        </Button>

        <Button type="dashed" shape="circle" icon={<SearchOutlined />} size="large" />
        <Button type="dashed" icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <Button icon={<SearchOutlined />} size="large" href="https://www.google.com" />
      </>
    ))
  .add('group', () => {
    const getGroup = (props?: ButtonGroupProps) => (
      <div>
        <Button.Group {...props}>
          <Button type="primary">Button 1</Button>
          <Button type="primary">Button 2</Button>
          <Button type="primary" icon={<DownloadOutlined />} disabled />
          <Button type="primary" icon={<DownloadOutlined />} />
        </Button.Group>
      </div>
    );

    const App: React.FC = () => (
      <>
        {getGroup({ size: 'small' })}
        <br />
        {getGroup()}
        <br />
        {getGroup({ size: 'large' })}
      </>
    );

    return <App />;
  })
  .add('loading', () => {
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });

      setTimeout(() => {
        setLoadings(prevLoadings => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 6000);
    };

    return (
      <>
        <div style={{ width: '100%' }}>
          <Button type="primary" loading>
            Loading
          </Button>
          <Button type="primary" size="small" loading>
            Loading
          </Button>
          <Button type="primary" icon={<PoweroffOutlined />} loading />
        </div>

        <div style={{ width: '100%' }}>
          <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
            Click me!
          </Button>
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            loading={loadings[1]}
            onClick={() => enterLoading(1)}
          >
            Click me!
          </Button>
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            loading={loadings[2]}
            onClick={() => enterLoading(2)}
          />
        </div>
      </>
    );
  })
  .add('size', () => {
    const [size, setSize] = useState<SizeType>('large');

    return (
      <>
        <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Button type="primary" size={size}>
          Primary
        </Button>
        <Button size={size}>Default</Button>
        <Button type="dashed" size={size}>
          Dashed
        </Button>
        <br />
        <Button type="link" size={size}>
          Link
        </Button>
        <br />
        <Button type="primary" icon={<DownloadOutlined />} size={size} />
        <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
        <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
        <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
          Download
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} size={size}>
          Download
        </Button>
      </>
    );
  });
