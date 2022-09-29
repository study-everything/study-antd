
import React from 'react'
import classnames from 'classnames'

export interface AutoCompleteProps {
	defaultOpen?: boolean;
	disabled?: boolean;
	dropdownClassName?: string;
	open?: boolean;
	onBlur?: () => void;
	onChange?: (e) => void;
	onFocus?: () => void;
	onSelect?: (value?: string, option?: any) => void;
	onSearch?: (value?: string) => void;
	options?: Array<any>;
	placeholder?: string;
	value?: string;
	status?: string;
	filterOption?: (inputValue: string, option?: any) => void
}


export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
	console.log(props, 'props');

	// TODO
	const { defaultOpen = false, disabled, dropdownClassName, open = false, onBlur, onChange, onFocus, onSelect, options = ['1', '11', '111'], placeholder, value, status, filterOption } = props;
	// const [status, setStatus] = useState('')
	// const changeVal = (e: any) => {
	// 	console.log(e.target.value);
	// 	setStatus(e.target.value)
	// }
	const className = classnames('autoComplete-select', `autoComplete-${status}`)
	return (
		<div className='autoComplete' filterOption={filterOption}>
			<input
				className={className}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				value={value}
			/>
			<div className={classnames('autoComplete-warper', dropdownClassName)} style={{ display: options?.length > 0 || open === true || defaultOpen === true ? 'block' : 'none' }}>
				{options.map((v: any, index: number) => (
					<p key={index} onClick={() => { onSelect(v, options) }}>{v.value}</p>
				))}
			</div>
		</div>
	)
}