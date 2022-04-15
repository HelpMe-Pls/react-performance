// Fix "perf death by a thousand cuts"
// http://localhost:3000/isolated/final/06.js

import * as React from 'react'
import {
	useForceRerender,
	useDebouncedState,
	AppGrid,
	updateGridState,
	updateGridCellState,
} from '../../ts_utils'

type IAppAction =
	| {
			type: 'UPDATE_GRID'
	  }
	| {
			type: 'UPDATE_GRID_CELL'
			row: number
			column: number
	  }

type IAppState = {
	grid: number[][]
}

type ICellProps = {
	row: number
	column: number
}

const AppStateContext = React.createContext<IAppState | null>(null)
const AppDispatchContext =
	React.createContext<React.Dispatch<IAppAction> | null>(null)

const initialGrid = Array.from({length: 100}, () =>
	Array.from({length: 100}, () => Math.random() * 100),
)

const appReducer = (state: IAppState, action: IAppAction) => {
	switch (action.type) {
		case 'UPDATE_GRID_CELL': {
			return {...state, grid: updateGridCellState(state.grid, action)}
		}
		case 'UPDATE_GRID': {
			return {...state, grid: updateGridState(state.grid)}
		}
		default: {
			//@ts-expect-error
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

const AppProvider = ({children}: {children: React.ReactNode}) => {
	const [state, dispatch] = React.useReducer(appReducer, {
		grid: initialGrid,
	})
	return (
		<AppStateContext.Provider value={state}>
			<AppDispatchContext.Provider value={dispatch}>
				{children}
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}

const useAppState = () => {
	const context = React.useContext(AppStateContext)
	if (!context) {
		throw new Error('useAppState must be used within the AppProvider')
	}
	return context
}

const useAppDispatch = () => {
	const context = React.useContext(AppDispatchContext)
	if (!context) {
		throw new Error('useAppDispatch must be used within the AppProvider')
	}
	return context
}

const Grid = React.memo(() => {
	const dispatch = useAppDispatch()
	const [rows, setRows] = useDebouncedState(50)
	const [columns, setColumns] = useDebouncedState(50)
	const updateGridData = () => dispatch({type: 'UPDATE_GRID'})
	return (
		<AppGrid
			onUpdateGrid={updateGridData}
			rows={rows}
			handleRowsChange={setRows}
			columns={columns}
			handleColumnsChange={setColumns}
			Cell={Cell}
		/>
	)
})

const Cell = React.memo(({row, column}: ICellProps) => {
	const state = useAppState()

	// kinda hacky way to fix this issue
	// there's possible a better way to do this...
	const cell = Array.from(state.grid[row] ?? [])[column] ?? 0

	const dispatch = useAppDispatch()
	const handleClick = () => dispatch({type: 'UPDATE_GRID_CELL', row, column})
	return (
		<button
			className="cell"
			onClick={handleClick}
			style={{
				color: cell > 50 ? 'white' : 'black',
				backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
			}}
		>
			{Math.floor(cell)}
		</button>
	)
})

const DogNameInput = () => {
	const [dogName, setDogName] = React.useState('')

	// Now, whenever we type in the <input/>, ONLY this component is re-rendered, not the whole <App/> like before.
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newDogName = event.target.value
		setDogName(newDogName)
	}

	return (
		<form onSubmit={e => e.preventDefault()}>
			<label htmlFor="dogName">Dog Name</label>
			<input
				value={dogName}
				onChange={handleChange}
				id="dogName"
				placeholder="Toto"
			/>
			{dogName ? (
				<div>
					<strong>{dogName}</strong>, I've a feeling we're not in
					Kansas anymore
				</div>
			) : null}
		</form>
	)
}

const App = () => {
	const forceRerender = useForceRerender()
	return (
		<div className="grid-app">
			<button onClick={forceRerender}>force rerender</button>
			<AppProvider>
				<div>
					<DogNameInput />
					<Grid />
				</div>
			</AppProvider>
		</div>
	)
}

export default App

/*
eslint
  no-func-assign: 0,
*/
