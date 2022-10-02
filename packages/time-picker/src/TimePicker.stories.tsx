import React from 'react';
import { storiesOf } from '@storybook/react';
import type { Moment } from 'moment';
import moment from 'moment';
import TimePicker from '.';

// import './style'

storiesOf('TimePicker', module).add('basic', () => {
	const onChange = (time: Moment, timeString: string) => {
		console.log(time, timeString);
	};
	return (
		<TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
	)
})
