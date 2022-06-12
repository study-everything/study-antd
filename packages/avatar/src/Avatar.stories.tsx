import React from 'react';
import { storiesOf } from '@storybook/react';
// import { Button } from '@ant-design';
import { UserOutlined } from '@ant-design/icons';
import Avatar from './index';
import './style/index'
import './Avatar.stories.less';

export default {
  title: 'Avatar',
  component: Avatar,
};

export const Basic = () => {
  const sizeMap = ['default', 'small', 'large']
  const [size, setSize] = React.useState(sizeMap[0])
  const handleChangeSize = (s: React.SetStateAction<string>) => {
    setSize(s)
  }

  const shapeMap = ['circle', 'square']
  const [shape, setShape] = React.useState(shapeMap[0])
  const handleShapeChange = (s: React.SetStateAction<string>) => {
    setShape(s)
  }
  return (
    <div className='avatar-story'>
      <div className='avatar-story__block'>
        <h1>Avatar</h1>
        <h3>基本</h3>
        <p>有三种尺寸,两种形状可以选择</p>
        <div className='avatar-story__row'>
          <span className='avatar-story__label'>尺寸</span>
          {sizeMap.map(s => <button key={s} onClick={() => handleChangeSize(s)}>{s}</button>)}
        </div>
        <div className='avatar-story__row'>
          <span className='avatar-story__label'>形状</span>
          {shapeMap.map(s => <button key={s} onClick={() => handleShapeChange(s)}>{s}</button>)}
        </div>
        <div>
          <Avatar
            src="https://www.keaidian.com/uploads/allimg/190424/24110307_6.jpg"
            size={size}
            shape={shape}
          />
        </div>
      </div>

      <div className='avatar-story__block'>
        <h3>类型</h3>
        <p>支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色</p>
        <div>
          <Avatar icon={<UserOutlined />} />
          <Avatar>U</Avatar>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar src={<img src="https://www.keaidian.com/uploads/allimg/190424/24110307_6.jpg" style={{ width: 32 }} />} />
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  )
}

export const Group = () => {
  const sizeMap = ['default', 'small', 'large']
  const [size, setSize] = React.useState(sizeMap[0])
  const handleChangeSize = (s) => {
    setSize(s)
  }
  const defaultCount = 5
  const [maxCount, setMaxCount] = React.useState(defaultCount)
  const handleChangeCount = (e) => {
    const n = Number(e.target.value) as number;

    if (typeof n !== 'number') return
    setMaxCount(n)
  }

  const colors = ['#87d068', '#e46ae3', '#e46a83', '#096dd9', '#666666', '#bdcb1a']

  return (
    <div className='avatar-story'>
      <h1>Avatar.Group</h1>
      <div className='avatar-story__block'>
        <div className='avatar-story__row'>
          <span className='avatar-story__label'>尺寸</span>
          {sizeMap.map(s => <button key={s} onClick={() => handleChangeSize(s)}>{s}</button>)}
        </div>
        <div className='avatar-story__row'>
          <span className='avatar-story__label'>最大展示个数</span>
          <input onChange={handleChangeCount} defaultValue={defaultCount} />
        </div>
        <Avatar.Group maxCount={maxCount} size={size}>
          {
            // eslint-disable-next-line react/jsx-key
            colors.map(c => <Avatar style={{ backgroundColor: c }} icon={<UserOutlined />} />)
          }
        </Avatar.Group>
      </div>
    </div>
  )
} 
