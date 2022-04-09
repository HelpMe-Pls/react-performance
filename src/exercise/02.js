// useMemo for expensive calculations
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useCombobox} from '../use-combobox'
import {getItems} from '../filter-cities'
import {useForceRerender} from '../utils'

function Menu({
	getMenuProps,
	items,
	getItemProps,
	selectedItem,
	highlightedIndex,
}) {
	return (
		<ul {...getMenuProps()}>
			{items.map((item, index) => (
				<ListItem
					key={item.id}
					index={index}
					item={item}
					getItemProps={getItemProps}
					selectedItem={selectedItem}
					highlightedIndex={highlightedIndex}
				>
					{item.name}
				</ListItem>
			))}
		</ul>
	)
}

function ListItem({
	index,
	item,
	getItemProps,
	selectedItem,
	highlightedIndex,
	...props
}) {
	const isSelected = selectedItem?.id === item.id
	const isHighlighted = highlightedIndex === index
	return (
		<li
			{...getItemProps({
				index,
				item,
				style: {
					fontWeight: isSelected ? 'bold' : 'normal',
					backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
				},
				...props,
			})}
		/>
	)
}

function App() {
	const forceRerender = useForceRerender()
	const [inputValue, setInputValue] = React.useState('')

	// 🐨 wrap getItems in a call to `React.useMemo`
	const allItems = getItems(inputValue)
	const items = allItems.slice(0, 100)

	const {
		selectedItem,
		highlightedIndex,
		getComboboxProps,
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		selectItem,
	} = useCombobox({
		items,
		inputValue,
		onInputValueChange: ({inputValue: newValue}) => setInputValue(newValue),
		onSelectedItemChange: ({selectedItem}) =>
			alert(
				selectedItem
					? `You selected ${selectedItem.name}`
					: 'Selection Cleared',
			),
		itemToString: item => (item ? item.name : ''),
	})

	return (
		<div className="city-app">
			<button onClick={forceRerender}>force rerender</button>
			<div>
				<label {...getLabelProps()}>Find a city</label>
				<div {...getComboboxProps()}>
					<input {...getInputProps({type: 'text'})} />
					<button
						onClick={() => selectItem(null)}
						aria-label="toggle menu"
					>
						&#10005;
					</button>
				</div>
				<Menu
					items={items}
					getMenuProps={getMenuProps}
					getItemProps={getItemProps}
					highlightedIndex={highlightedIndex}
					selectedItem={selectedItem}
				/>
			</div>
		</div>
	)
}

export default App
