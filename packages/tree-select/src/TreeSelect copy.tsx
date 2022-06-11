
import React, { useCallback, useState } from 'react'
import RcTreeSelect from 'rc-tree-select';
import { gData } from './utils/dataUtil';

export interface TreeSelectProps {

}


export const TreeSelect: React.FC<TreeSelectProps> = (props) => {
	const [tsOpen, setTsOpen] = useState(false)
	const [value, setValue] = useState('0-0-0-value1')
	const [multipleValue, setMultipleValue] = useState([])

	const onChange = useCallback((value, ...rest) => {
		console.log('value', value, rest)
		setValue(value)
	}, [])

	const onSelect = useCallback((...args) => {
		console.log('onSelect', args)
	}, [])

	const onMultipleChange = useCallback((value, ...rest) => {
		console.log('multipleValue', value, rest)
		setMultipleValue(value)
	}, [])
	// TODO
	return (
		<>
			<h2>single select</h2>
		  <RcTreeSelect
				style={{ width: 300 }}
				transitionName="rc-tree-select-dropdown-slide-up"
				choiceTransitionName="rc-tree-select-selection__choice-zoom"
				// dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
				placeholder={<i>请下拉选择</i>}
				showSearch
				allowClear
				treeLine
				value={value}
				treeData={gData}
				treeNodeFilterProp="label"
				filterTreeNode={false}
				open={tsOpen}
				onChange={onChange}
				onDropdownVisibleChange={v => {
					console.log('single onDropdownVisibleChange', v);
					setTsOpen(v);
				}}
				onSelect={onSelect}
			/>
			<h2>multiple select</h2>
        <RcTreeSelect
          style={{ width: 300 }}
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          // dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
          placeholder={<i>请下拉选择</i>}
          multiple
          value={multipleValue}
          treeData={gData}
          treeNodeFilterProp="title"
          onChange={onMultipleChange}
          onSelect={onSelect}
          allowClear
        />
		</>
	)
}