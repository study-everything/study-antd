import React from 'react';
import { storiesOf } from '@storybook/react';
import { Alert }from './Alert';
import './style'

storiesOf('Alert', module)
	.add('basic', () => (	
		<Alert message="Success Text" type="success" /> 
	))
	.add('type', () => (
		<>
			<Alert className='mb-10' message="Success Text" type="success" /> 
			<Alert className='mb-10' message="Info Text" type="info"/> 
			<Alert className='mb-10' message="Warning Text" type="warning"/> 
			<Alert className='mb-10' message="Error Text" type="error"/> 
		</>
	))
	.add('closable', () => {
		
		const onClose = () => {
			// eslint-disable-next-line no-alert
			console.log('回调函数');
		} 

		return (
			<>
				<Alert
						message="Error Text"
						description="Error Description Error Description Error Description Error Description Error Description Error Description"
						type="error"
						className='mb-10' />
				<Alert
						message="Error Text"
						description="Error Description Error Description Error Description Error Description Error Description Error Description"
						type="error"
						closable
						onClose={onClose}
						className='mb-10' />
				</>
				
    );
  });

// 