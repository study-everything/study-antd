import * as React from 'react';
import CSSMotion from 'rc-animate/lib/CSSMotion';
import classNames from 'classnames';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import List from '../List';
import './animate.less';

let uuid = 0;

function genItem() {
  const item = {
    id: `key_${uuid}`,
    uuid
  };
  uuid += 1;
  return item;
}

const originData = [];

for (let i = 0; i < 1000; i += 1) {
  originData.push(genItem());
}

const getCurrentHeight = node => ({
  height: node.offsetHeight
});

const getMaxHeight = node => ({
    height: node.scrollHeight
  });

const getCollapsedHeight = () => ({
  height: 0,
  opacity: 0
});

const MyItem = ({
  id,
  uuid: itemUuid,
  visible,
  onClose,
  onLeave,
  onAppear,
  onInsertBefore,
  onInsertAfter,
  motionAppear
}, ref) => {
  const motionRef = React.useRef(false);
  useLayoutEffect(() => () => {
    if (motionRef.current) {
      onAppear();
    }
  }, []);
  return (<CSSMotion visible={visible} ref={ref} motionName="motion" motionAppear={motionAppear} onAppearStart={getCollapsedHeight} onAppearActive={node => {
    motionRef.current = true;
    return getMaxHeight(node);
  }} onAppearEnd={onAppear} onLeaveStart={getCurrentHeight} onLeaveActive={getCollapsedHeight} onLeaveEnd={() => {
    onLeave(id);
  }}>
    {({
      className,
      style
    }, passedMotionRef) => (<div ref={passedMotionRef} className={classNames('item', className)} style={style} data-id={id}>
        <div style={{
          height: itemUuid % 2 ? 100 : undefined
        }}>
          <button type="button" onClick={() => {
            onClose(id);
          }}>
            Close
          </button>
          <button type="button" onClick={() => {
            onInsertBefore(id);
          }}>
            Insert Before
          </button>
          <button type="button" onClick={() => {
            onInsertAfter(id);
          }}>
            Insert After
          </button>
          {id}
        </div>
      </div>)}
  </CSSMotion>);
};

const ForwardMyItem = React.forwardRef(MyItem);

const Demo = () => {
  const [data, setData] = React.useState(originData);
  const [closeMap, setCloseMap] = React.useState({});
  const [animating, setAnimating] = React.useState(false);
  const [insertIndex, setInsertIndex] = React.useState();
  const listRef = React.useRef();

  const onClose = id => {
    setCloseMap({
      ...closeMap,
      [id]: true
    });
  };

  const onLeave = id => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  const onAppear = (...args) => {
    console.log('Appear:', args);
    setAnimating(false);
  };

  function lockForAnimation() {
    setAnimating(true);
  }

  const onInsertBefore = id => {
    const index = data.findIndex(item => item.id === id);
    const newData = [...data.slice(0, index), genItem(), ...data.slice(index)];
    setInsertIndex(index);
    setData(newData);
    lockForAnimation();
  };

  const onInsertAfter = id => {
    const index = data.findIndex(item => item.id === id) + 1;
    const newData = [...data.slice(0, index), genItem(), ...data.slice(index)];
    setInsertIndex(index);
    setData(newData);
    lockForAnimation();
  };

  return (<React.StrictMode>
    <div>
      <h2>Animate</h2>
      <p>Current: {data.length} records</p>

      <List data={data} data-id="list" height={200} itemHeight={20} itemKey="id" ref={listRef} style={{
        border: '1px solid red',
        boxSizing: 'border-box'
      }}>
        {(item, index) => <ForwardMyItem {...item} motionAppear={animating && insertIndex === index} visible={!closeMap[item.id]} onClose={onClose} onLeave={onLeave} onAppear={onAppear} onInsertBefore={onInsertBefore} onInsertAfter={onInsertAfter} />}
      </List>
    </div>
  </React.StrictMode>);
};

export default Demo;