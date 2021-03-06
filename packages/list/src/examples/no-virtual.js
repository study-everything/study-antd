/*
 * @Author: dfh
 * @Date: 2022-06-12 13:46:16
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import * as React from 'react';
import List from '../List';

const MyItem = ({
  id,
  height
}, ref) => (<span ref={ref} style={{
  border: '1px solid gray',
  padding: '0 16px',
  height,
  lineHeight: '30px',
  boxSizing: 'border-box',
  display: 'inline-block'
}}>
  {id}
</span>);

const ForwardMyItem = React.forwardRef(MyItem);
const data = [];

for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i,
    height: 30 + (i % 2 ? 20 : 0)
  });
}

const Demo = () => (<React.StrictMode>
    <div>
      <h2>Not Data</h2>
      <List data={null} itemHeight={30} height={100} itemKey="id" style={{
        border: '1px solid red',
        boxSizing: 'border-box'
      }}>
        {item => <ForwardMyItem {...item} />}
      </List>

      <h2>Less Count</h2>
      <List data={data.slice(0, 1)} itemHeight={30} height={100} itemKey="id" style={{
        border: '1px solid red',
        boxSizing: 'border-box'
      }}>
        {item => <ForwardMyItem {...item} />}
      </List>

      <h2>Less Item Height</h2>
      <List data={data.slice(0, 10)} itemHeight={1} height={100} itemKey="id" style={{
        border: '1px solid red',
        boxSizing: 'border-box'
      }}>
        {item => <ForwardMyItem {...item} />}
      </List>

      <h2>Without Height</h2>
      <List data={data} itemHeight={30} itemKey="id" style={{
        border: '1px solid red',
        boxSizing: 'border-box'
      }}>
        {item => <ForwardMyItem {...item} />}
      </List>
    </div>
  </React.StrictMode>);

export default Demo;