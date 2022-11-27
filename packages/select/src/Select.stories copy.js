import React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from './select';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

storiesOf('Select', module)
  .add('basic', () => {
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    
    const onSearch = (value) => {
      console.log('search:', value);
    };
    
    const onFilterOption = (input, option) => (option.children).toLowerCase().includes(input.toLowerCase())
    
    return (
      <Select defaultValue="lucy" showSearch placeholder="Select a person" optionFilterProp="children" style={{width: 120}} onChange={handleChange} onSearch={onSearch} filterOption={ onFilterOption }>
        <Option value="lucy">lucy</Option>
        <Option value="jucy">jucy</Option>
        <Option value="disabled" disabled>
            Disabled
          </Option>
      </Select>
    )
  })
  .add('多选', () => {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const App = () => (
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
      >
        {children}
      </Select>
    );
  })
  .add('标签', () => {
    const children = [];

    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    const App = () => (
      <Select
        mode="tags"
        style={{
          width: '100%',
        }}
        placeholder="Tags Mode"
        onChange={handleChange}
      >
        {children}
      </Select>
    );
  })
  .add('大小', () => {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const handleChange = (value) => {
      console.log(`Selected: ${value}`);
    };

    const App = () => {
      const [size, setSize] = useState('middle');

      const handleSizeChange = (e) => {
        setSize(e.target.value);
      };

      return (
        <>
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
          <br />
          <br />
          <Select
            size={size}
            defaultValue="a1"
            onChange={handleChange}
            style={{
              width: 200,
            }}
          >
            {children}
          </Select>
          <br />
          <Select
            mode="multiple"
            size={size}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={handleChange}
            style={{
              width: '100%',
            }}
          >
            {children}
          </Select>
          <br />
          <Select
            mode="tags"
            size={size}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={handleChange}
            style={{
              width: '100%',
            }}
          >
            {children}
          </Select>
        </>
      );
    };
  }).add('带排序的搜索', () => {
    const App = () => (
      <Select
        showSearch
        style={{
          width: 200,
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
      >
        <Option value="1">Not Identified</Option>
        <Option value="2">Closed</Option>
        <Option value="3">Communicated</Option>
        <Option value="4">Identified</Option>
        <Option value="5">Resolved</Option>
        <Option value="6">Cancelled</Option>
      </Select>
    );
  });
