import React, {useState} from 'react';
import type {ComponentMeta, ComponentStory} from '@storybook/react';
import { Button } from 'antd';
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
