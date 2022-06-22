import React from 'react';
import { storiesOf } from '@storybook/react';
import Form, { useForm } from './Form';
import Field from './Field';
export const Input = ({ value = '', ...props }) => <input {...props} value={value} />;
import './style'
function renderContent({ onSubmit }) {
	return (
		<div>
			<Field name="light">
				<Input />
			</Field>
			<button onClick={onSubmit}>submit</button>
		</div>
	);
}
storiesOf('Form', module).add('Demo', () => {
	const form = useForm();
	const onSubmit = () => {
		console.log(form.current.getFieldsValue())
	};
	return (<>
		<Form ref={form}>{renderContent({ onSubmit })}</Form>
	</>);
})