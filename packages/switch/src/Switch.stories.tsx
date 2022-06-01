import React, {useState} from 'react';
import type {ComponentMeta, ComponentStory} from '@storybook/react';
import { Button } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import './Switch.stories.less';
import { Switch }from './Switch';
import './style'

export default {
	title: 'Switch',
	component: Switch,
	argTypes: {
		backgroundColor: { control: 'color' },
	}
} as ComponentMeta<typeof Switch>

const switchWithSize = () => (
	<div>
		<div>
			<Switch />
		</div>
		<div>
			<Switch size="small" />
		</div>
	</div>
)

export const SwitchWithSize: ComponentStory<typeof Switch> = () => switchWithSize();
SwitchWithSize.storyName = 'Size'

const SwitchWithDisable = () => {
	const [disableFlag, setDisableFlag] = useState<boolean>(true);
	const toggleDisable = () => {
		setDisableFlag(!disableFlag);
	}
	return (
		<div>
			<Switch defaultChecked disabled={disableFlag}/>
			<div className='toggle-btn'>
				<Button type="primary" onClick={toggleDisable}>Toggle disabled</Button>
			</div>
		</div>
	)
}
export const switchWithDisable: ComponentStory<typeof Switch> = () => SwitchWithDisable();
switchWithDisable.storyName = 'Disabled'

const SwitchWithFuc = () => {
	const switchClickHandle = (switchFlag) => {
		setTimeout(() => alert(`您点击了Switch，当前的状态是${switchFlag}`), 300);
	}
	const switchChangeHandle = (switchFlag) => {
		setTimeout(() => alert(`Switch change触发，当前的状态是${switchFlag}`), 300);
	}
	return (
		<div>
			<div>可以进行小键盘左右切换控制</div>
			<Switch
				defaultChecked
				onClick={switchClickHandle}
				onChange={switchChangeHandle}
			/>
		</div>
	)
}
export const switchWithFuc: ComponentStory<typeof Switch> = () => SwitchWithFuc();
switchWithFuc.storyName = 'Event';

const SwitchWithInnerContent = () => (
		<>
			<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
			<div className='middle-section'>
				<Switch checkedChildren="1" unCheckedChildren="0" />
			</div>
			<Switch
				checkedChildren={<CheckOutlined />}
				unCheckedChildren={<CloseOutlined />}
				defaultChecked
			/>
		</>
	)
export const switchWithInnerContent: ComponentStory<typeof Switch> = () => SwitchWithInnerContent();
switchWithInnerContent.storyName = 'InnerContent';

const SwitchWithLoading = () => (
		<>
			<Switch loading defaultChecked />
			<br />
			<Switch size="small" loading />
		</>
	)
export const switchWithLoading: ComponentStory<typeof Switch> = () => SwitchWithLoading();
switchWithLoading.storyName = 'Loading';
