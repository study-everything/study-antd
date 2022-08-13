import React, { useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import { Divider, Input, Space, Button, Tag, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Select from './select'
import './style/index'
import './css.css'
import Main from './demo'
import jsonp from 'fetch-jsonp';
import qs from 'qs';

const { Option, OptGroup } = Select;

// 基本使用、带搜索框
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log('search:', value);
};

const onFilterOption = (input, option) => (option.children).toLowerCase().includes(input.toLowerCase())

const App = () => (
  <Select defaultValue="lucy" showSearch placeholder="Select a person" optionFilterProp="children" style={{width: 120}} onChange={handleChange} onSearch={onSearch} filterOption={ onFilterOption }>
    <Option value="lucy">lucy</Option>
    <Option value="jucy">jucy</Option>
    <Option value="disabled" disabled>
        Disabled
      </Option>
  </Select>
);

// 多选
// const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// const App = () => (
//   <Select
//     mode="multiple"
//     allowClear
//     style={{ width: '100%' }}
//     placeholder="Please select"
//     defaultValue={['a10', 'c12']}
//     onChange={handleChange}
//   >
//     {children}
//   </Select>
// );

// 定制回填内容
// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// ReactDOM.render(
//   <Select
//     mode="multiple"
//     style={{
//       width: '100%',
//     }}
//     placeholder="select one country"
//     defaultValue={['china']}
//     onChange={handleChange}
//     optionLabelProp="label"
//   >
//     <Option value="china" label="China">
//       <div className="demo-option-label-item">
//         <span role="img" aria-label="China">
//           🇨🇳
//         </span>
//         China (中国)
//       </div>
//     </Option>
//     <Option value="usa" label="USA">
//       <div className="demo-option-label-item">
//         <span role="img" aria-label="USA">
//           🇺🇸
//         </span>
//         USA (美国)
//       </div>
//     </Option>
//     <Option value="japan" label="Japan">
//       <div className="demo-option-label-item">
//         <span role="img" aria-label="Japan">
//           🇯🇵
//         </span>
//         Japan (日本)
//       </div>
//     </Option>
//     <Option value="korea" label="Korea">
//       <div className="demo-option-label-item">
//         <span role="img" aria-label="Korea">
//           🇰🇷
//         </span>
//         Korea (韩国)
//       </div>
//     </Option>
//   </Select>,
//   document.getElementById('root')
// );

// 标签
// const children = [];

// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };
// const App = () => (
//   <Select
//     mode="tags"
//     style={{
//       width: '100%',
//     }}
//     placeholder="Tags Mode"
//     onChange={handleChange}
//   >
//     {children}
//   </Select>
// );

// 联动
// const provinceData = ['Zhejiang', 'Jiangsu'];
// const cityData = {
//   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
//   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
// };

// const App = () => {
//   const [cities, setCities] = useState(cityData[provinceData[0]]);
//   const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
//   const handleProvinceChange = (value) => {
//     setCities(cityData[value]);
//     setSecondCity(cityData[value][0]);
//   };
  
//   const onSecondCityChange = (value) => {
//     setSecondCity(value);
//   };
  
//   return (
//     <>
//       <Select
//         defaultValue={provinceData[0]}
//         style={{
//           width: 120,
//         }}
//         onChange={handleProvinceChange}
//       >
//         {provinceData.map((province) => (
//           <Option key={province}>{province}</Option>
//         ))}
//       </Select>

//       <Select
//         style={{
//           width: 120,
//         }}
//         value={secondCity}
//         onChange={onSecondCityChange}
//       >
//         {cities.map((city) => (
//           <Option key={city}>{city}</Option>
//         ))}
//       </Select>
//     </>
//   );
// }

// 获得选项的文本
// const handleChange = (value) => {
//   console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
// };

// const App = () => (
//   <Select
//     labelInValue
//     defaultValue={{
//       value: 'lucy',
//       label: 'Lucy (101)',
//     }}
//     style={{
//       width: 120,
//     }}
//     onChange={handleChange}
//   >
//     <Option value="jack">Jack (100)</Option>
//     <Option value="lucy">Lucy (101)</Option>
//   </Select>
// );

// 搜索用户
// function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
//   const [fetching, setFetching] = useState(false);
//   const [options, setOptions] = useState([]);
//   const fetchRef = useRef(0);
//   const debounceFetcher = useMemo(() => {
//     const loadOptions = (value) => {
//       fetchRef.current += 1;
//       const fetchId = fetchRef.current;
//       setOptions([]);
//       setFetching(true);
//       fetchOptions(value).then((newOptions) => {
//         if (fetchId !== fetchRef.current) {
//           // for fetch callback order
//           return;
//         }

//         setOptions(newOptions);
//         setFetching(false);
//       });
//     };

//     return debounce(loadOptions, debounceTimeout);
//   }, [fetchOptions, debounceTimeout]);
//   return (
//     <Select
//       labelInValue
//       filterOption={false}
//       onSearch={debounceFetcher}
//       notFoundContent={fetching ? <span size="small">111</span> : null}
//       {...props}
//       options={options}
//     />
//   );
// } // Usage of DebounceSelect

// async function fetchUserList(username) {
//   console.log('fetching user', username);
//   return fetch('https://randomuser.me/api/?results=5')
//     .then((response) => response.json())
//     .then((body) =>
//       body.results.map((user) => ({
//         label: `${user.name.first} ${user.name.last}`,
//         value: user.login.username,
//       })),
//     );
// }

// const App = () => {
//   const [value, setValue] = useState([]);
//   return (
//     <DebounceSelect
//       mode="multiple"
//       value={value}
//       placeholder="Select users"
//       fetchOptions={fetchUserList}
//       onChange={(newValue) => {
//         setValue(newValue);
//       }}
//       style={{
//         width: '100%',
//       }}
//     />
//   );
// };

// 隐藏已选择选项
// const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
// const App = () => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
//   return (
//     <Select
//       mode="multiple"
//       placeholder="Inserted are removed"
//       value={selectedItems}
//       onChange={setSelectedItems}
//       style={{
//         width: '100%',
//       }}
//     >
//       {filteredOptions.map((item) => (
//         <Select.Option key={item} value={item}>
//           {item}
//         </Select.Option>
//       ))}
//     </Select>
//   );
// };


// 自定义选择标签
// const options = [
//   {
//     value: 'gold',
//   },
//   {
//     value: 'lime',
//   },
//   {
//     value: 'green',
//   },
//   {
//     value: 'cyan',
//   },
// ];

// const tagRender = (props) => {
//   const { label, value, closable, onClose } = props;

//   const onPreventMouseDown = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };

//   return (
//     <Tag
//       color={value}
//       onMouseDown={onPreventMouseDown}
//       closable={closable}
//       onClose={onClose}
//       style={{
//         marginRight: 3,
//       }}
//     >
//       {label}
//     </Tag>
//   );
// };

// const App = () => (
//   <Select
//     mode="multiple"
//     showArrow
//     tagRender={tagRender}
//     defaultValue={['gold', 'cyan']}
//     style={{
//       width: '100%',
//     }}
//     options={options}
//   />
// );

// 大数据
// const options = [];

// for (let i = 0; i < 100000; i++) {
//   const value = `${i.toString(36)}${i}`;
//   options.push({
//     label: value,
//     value,
//     disabled: i === 10,
//   });
// }

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// const App = () => (
//   <Select
//     mode="multiple"
//     style={{
//       width: '100%',
//     }}
//     placeholder="Please select"
//     defaultValue={['a10', 'c12']}
//     onChange={handleChange}
//     options={options}
//   />
// );

// const App = () => {
//   const [placement, SetPlacement] = useState('topLeft');
//   return (
//     <Select
//         defaultValue="HangZhou"
//         style={{
//           width: 120,
//         }}
//         dropdownMatchSelectWidth={false}
//         placement={placement}
//       >
//         <Option value="HangZhou">HangZhou #310000</Option>
//         <Option value="NingBo">NingBo #315000</Option>
//         <Option value="WenZhou">WenZhou #325000</Option>
//       </Select>
//   );
// }

// 三种大小
// const children = [];

// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

// const handleChange = (value) => {
//   console.log(`Selected: ${value}`);
// };

// const App = () => {
//   const [size, setSize] = useState('middle');

//   const handleSizeChange = (e) => {
//     setSize(e.target.value);
//   };

//   return (
//     <>
//       <Radio.Group value={size} onChange={handleSizeChange}>
//         <Radio.Button value="large">Large</Radio.Button>
//         <Radio.Button value="default">Default</Radio.Button>
//         <Radio.Button value="small">Small</Radio.Button>
//       </Radio.Group>
//       <br />
//       <br />
//       <Select
//         size={size}
//         defaultValue="a1"
//         onChange={handleChange}
//         style={{
//           width: 200,
//         }}
//       >
//         {children}
//       </Select>
//       <br />
//       <Select
//         mode="multiple"
//         size={size}
//         placeholder="Please select"
//         defaultValue={['a10', 'c12']}
//         onChange={handleChange}
//         style={{
//           width: '100%',
//         }}
//       >
//         {children}
//       </Select>
//       <br />
//       <Select
//         mode="tags"
//         size={size}
//         placeholder="Please select"
//         defaultValue={['a10', 'c12']}
//         onChange={handleChange}
//         style={{
//           width: '100%',
//         }}
//       >
//         {children}
//       </Select>
//     </>
//   );
// };

// 带排序的搜索
// const App = () => (
//   <Select
//     showSearch
//     style={{
//       width: 200,
//     }}
//     placeholder="Search to Select"
//     optionFilterProp="children"
//     filterOption={(input, option) => option.children.includes(input)}
//     filterSort={(optionA, optionB) =>
//       optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//     }
//   >
//     <Option value="1">Not Identified</Option>
//     <Option value="2">Closed</Option>
//     <Option value="3">Communicated</Option>
//     <Option value="4">Identified</Option>
//     <Option value="5">Resolved</Option>
//     <Option value="6">Cancelled</Option>
//   </Select>
// );

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// const App = () => (
//   <Select
//     defaultValue="lucy"
//     style={{
//       width: 200,
//     }}
//     onChange={handleChange}
//   >
//     <OptGroup label="Manager">
//       <Option value="jack">Jack</Option>
//       <Option value="lucy">Lucy</Option>
//     </OptGroup>
//     <OptGroup label="Engineer">
//       <Option value="Yiminghe">yiminghe</Option>
//     </OptGroup>
//   </Select>
// );


// let timeout;
// let currentValue;

// const fetch = (value, callback) => {
//   if (timeout) {
//     clearTimeout(timeout);
//     timeout = null;
//   }

//   currentValue = value;

//   const fake = () => {
//     const str = qs.stringify({
//       code: 'utf-8',
//       q: value,
//     });
//     jsonp(`https://suggest.taobao.com/sug?${str}`)
//       .then((response) => response.json())
//       .then((d) => {
//         if (currentValue === value) {
//           const { result } = d;
//           const data = result.map((item) => ({
//             value: item[0],
//             text: item[0],
//           }));
//           callback(data);
//         }
//       });
//   };

//   timeout = setTimeout(fake, 300);
// };

// const SearchInput = (props) => {
//   const [data, setData] = useState([]);
//   const [value, setValue] = useState();

//   const handleSearch = (newValue) => {
//     if (newValue) {
//       fetch(newValue, setData);
//     } else {
//       setData([]);
//     }
//   };

//   const handleChange = (newValue) => {
//     setValue(newValue);
//   };

//   const options = data.map((d) => <Option key={d.value}>{d.text}</Option>);
//   return (
//     <Select
//       showSearch
//       value={value}
//       placeholder={props.placeholder}
//       style={props.style}
//       defaultActiveFirstOption={false}
//       showArrow={false}
//       filterOption={false}
//       onSearch={handleSearch}
//       onChange={handleChange}
//       notFoundContent={null}
//     >
//       {options}
//     </Select>
//   );
// };

// const App = () => (
//   <SearchInput
//     placeholder="input search text"
//     style={{
//       width: 200,
//     }}
//   />
// );

// 自动分词
// const children = [];

// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// const App = () => (
//   <Select
//     mode="tags"
//     style={{
//       width: '100%',
//     }}
//     onChange={handleChange}
//     tokenSeparators={[',']}
//   >
//     {children}
//   </Select>
// );

// let index = 0;

// const App = () => {
//   const [items, setItems] = useState(['jack', 'lucy']);
//   const [name, setName] = useState('');
//   const inputRef = useRef(null);

//   const onNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const addItem = (e) => {
//     e.preventDefault();
//     setItems([...items, name || `New item ${index++}`]);
//     setName('');
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 0);
//   };

//   return (
//     <Select
//       style={{
//         width: 300,
//       }}
//       placeholder="custom dropdown render"
//       dropdownRender={(menu) => (
//         <>
//           {menu}
//           <Divider
//             style={{
//               margin: '8px 0',
//             }}
//           />
//           <Space
//             style={{
//               padding: '0 8px 4px',
//             }}
//           >
//             <Input
//               placeholder="Please enter item"
//               ref={inputRef}
//               value={name}
//               onChange={onNameChange}
//             />
//             <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
//               Add item
//             </Button>
//           </Space>
//         </>
//       )}
//     >
//       {items.map((item) => (
//         <Option key={item}>{item}</Option>
//       ))}
//     </Select>
//   );
// };

// 无边框
// const App = () => (
//   <>
//     <Select
//       defaultValue="lucy"
//       style={{
//         width: 120,
//       }}
//       bordered={false}
//     >
//       <Option value="jack">Jack</Option>
//       <Option value="lucy">Lucy</Option>
//       <Option value="Yiminghe">yiminghe</Option>
//     </Select>
//     <Select
//       defaultValue="lucy"
//       style={{
//         width: 120,
//       }}
//       disabled
//       bordered={false}
//     >
//       <Option value="lucy">Lucy</Option>
//     </Select>
//   </>
// );

// 响应式 maxTagCount
// const options = [];

// for (let i = 10; i < 36; i++) {
//   const value = i.toString(36) + i;
//   options.push({
//     label: `Long Label: ${value}`,
//     value,
//   });
// }

// const App = () => {
//   const [value, setValue] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);
//   const selectProps = {
//     mode: 'multiple',
//     style: {
//       width: '100%',
//     },
//     value,
//     options,
//     onChange: (newValue) => {
//       setValue(newValue);
//     },
//     placeholder: 'Select Item...',
//     maxTagCount: 'responsive',
//   };
//   return (
//     <Space
//       direction="vertical"
//       style={{
//         width: '100%',
//       }}
//     >
//       <Select {...selectProps} />
//       <Select {...selectProps} disabled />
//     </Space>
//   );
// };

// 自定义状态
// const App = () => (
//   <Select
//     status="error"
//     style={{
//       width: '100%',
//     }}
//   />
// );

export default App;
