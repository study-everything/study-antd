import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'antd';
import Upload from './index';
import './style'

const props  = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			console.log(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			console.log(`${info.file.name} file upload failed.`);
		}
	},
};
storiesOf('Uploadnew', module).add('Demo', () => (
	<>
		<Upload {...props}>
			<Button type="ghost">
				点击上传
			</Button>
		</Upload>
	</>
))