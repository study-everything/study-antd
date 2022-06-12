import * as React from 'react';
import List from '../List';

const MyItem = ({
  id
}, ref) => (<span ref={ref} style={{
  border: '1px solid gray',
  padding: '0 16px',
  height: 30,
  lineHeight: '30px',
  boxSizing: 'border-box',
  display: 'inline-block'
}}>
    {id}
  </span>);

const ForwardMyItem = React.forwardRef(MyItem);

function getData(count) {
  const data = [];

  for (let i = 0; i < count; i += 1) {
    data.push({
      id: i
    });
  }

  return data;
}

const Switch = () => {
  const [height, setHeight] = React.useState(200);
  const [data, setData] = React.useState(getData(20));
  const [fullHeight, setFullHeight] = React.useState(true);
  const listRef = React.useRef();
  return (<React.StrictMode>
      <div style={{
      height: '150vh'
    }}>
        <h2>Switch</h2>
        <span onChange={e => {
        setData(getData(Number(e.target.value)));
      }}>
          Data
          <label>
            <input type="radio" name="switch" value={0} />0
          </label>
          <label>
            <input type="radio" name="switch" value={2} />2
          </label>
          <label>
            <input type="radio" name="switch" value={20} />
            20
          </label>
          <label>
            <input type="radio" name="switch" value={100} />
            100
          </label>
          <label>
            <input type="radio" name="switch" value={200} />
            200
          </label>
          <label>
            <input type="radio" name="switch" value={1000} />
            1000
          </label>
          <button type="button" onClick={() => {
          listRef.current.scrollTo(null);
        }}>
            Show scrollbar
          </button>
        </span>
        <span onChange={e => {
        setHeight(Number(e.target.value));
      }}>
          | Height
          <label>
            <input type="radio" name="switch" value={0} />0
          </label>
          <label>
            <input type="radio" name="switch" value={100} />
            100
          </label>
          <label>
            <input type="radio" name="switch" value={200} />
            200
          </label>
        </span>
        <span>
          <button onClick={() => {
          setFullHeight(!fullHeight);
        }}>
            Full Height: {String(fullHeight)}
          </button>
        </span>

        <List ref={listRef} data={data} height={height} itemHeight={10} itemKey="id" fullHeight={fullHeight} style={{
        border: '1px solid red',
        boxSizing: 'border-box'
      }}>
          {(item, _, props) => <ForwardMyItem {...item} {...props} />}
        </List>
      </div>
    </React.StrictMode>);
};

export default Switch;