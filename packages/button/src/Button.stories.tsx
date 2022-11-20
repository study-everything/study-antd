import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { storiesOf } from '@storybook/react';
import { Button } from './button';
import type { SizeType } from './config-provider/SizeContext'
import './style'

const demoContainerStyles = {
	border: '1px solid rgba(0,0,0,.06)',
	padding: '20px',
	marginBottom: '48px',
}
const spacing = {
	marginRight: '8px',
	marginBottom: '12px'

}

const clickHandler = () => {
	message.success('click button!');
}

storiesOf('Button', module).add('Demo', () => {
	const [size, setSize] = useState<SizeType>('middle')
	const [loading, setLoading] = useState<boolean>(false)
	const [disabled, setDisabled] = useState<boolean>(false)

	const handleLoading = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			message.success('加载成功！')
		}, 2000)
	}
	return (<div>
		<div style={demoContainerStyles}>
			<h2>Button 的种类</h2>
			<Button style={spacing} onClick={clickHandler} type="primary" >Primary Button</Button>
			<Button style={spacing} onClick={clickHandler}>Default Button</Button>
			<Button style={spacing} onClick={clickHandler} type="dashed">Dashed Button</Button>
			<Button style={spacing} onClick={clickHandler} type="text">Text Button</Button>
			<Button style={spacing} onClick={clickHandler} type="link">Link Button</Button>
		</div>
		<div style={demoContainerStyles}>
			<h2>Button 的尺寸</h2>
			<Button.Group style={spacing} >
				<Button onClick={() => setSize('small')} >small</Button>
				<Button onClick={() => setSize('middle')} >middle</Button>
				<Button onClick={() => setSize('large')} >large</Button>
			</Button.Group>

			<div >
				<Button style={spacing} onClick={clickHandler} size={size} type="primary" >Primary Button</Button>
				<Button style={spacing} onClick={clickHandler} size={size} >Default Button</Button>
				<Button style={spacing} onClick={clickHandler} size={size} type="dashed">Dashed Button</Button>
				<Button style={spacing} onClick={clickHandler} size={size} type="text">Text Button</Button>
				<Button style={spacing} onClick={clickHandler} size={size} type="link">Link Button</Button>
			</div>
		</div>

		<div style={demoContainerStyles}>
			<h2>Button 加载状态 Loading...</h2>
			<Button style={spacing} onClick={clickHandler} loading type="primary" >loading</Button>
			<Button style={spacing} onClick={handleLoading} loading={loading} >{loading ? 'loading' : 'click'}</Button>
		</div>

		<div style={{ ...demoContainerStyles, background: '#d3d3d3' }}>
			<h2>Button Ghost 幽灵按钮</h2>
			<Button style={spacing} onClick={clickHandler} type="primary" ghost>Primary Button</Button>
			<Button style={spacing} onClick={clickHandler} ghost>Default Button</Button>
			<Button style={spacing} onClick={clickHandler} type="dashed" ghost>Dashed Button</Button>
		</div>
		<div style={demoContainerStyles}>
			<h2>Button block</h2>
			<p>按钮适应父元素宽度</p>
			<Button type="primary" block >btn1</Button>
			<Button block>btn2</Button>
			<Button type="dashed" block>btn3</Button>
			<Button type="link" block>btn4</Button>
			<Button type="text" block>btn5</Button>
		</div>
		<div style={demoContainerStyles}>
			<h2>Button icon 图标按钮</h2>
			<Button style={spacing} type="primary" shape="circle" icon={<SearchOutlined />} />
			<Button style={spacing} type="primary" shape="circle">R</Button>
			<Button style={spacing} shape="circle">e</Button>
			<Button style={spacing} shape="circle">a</Button>
			<Button style={spacing} shape="circle">c</Button>
			<Button style={spacing} shape="circle">t</Button>
			<Button style={spacing} icon={<SearchOutlined />}>Search</Button>
		</div>
		<div style={demoContainerStyles}>
			<h2>Button 不可用状态</h2>
			<Button style={spacing} onClick={() => setDisabled(!disabled)}>Toggle disabled state</Button>
			<br />
			<Button type='primary' style={spacing} disabled={disabled}>Button</Button>
			<Button type="dashed" style={spacing} disabled={disabled}>Button</Button>
			<Button type="text" style={spacing} disabled={disabled}>Button</Button>
		</div>
		<div style={demoContainerStyles}>
			<h2>Button danger 危险按钮</h2>
			<Button type='primary' style={spacing}  danger>Button</Button>
			<Button style={spacing}  danger>Button</Button>
			<Button type="dashed" style={spacing}  danger>Button</Button>
			<Button type="text" style={spacing} danger>Button</Button>
		</div>
	</div>)
})


