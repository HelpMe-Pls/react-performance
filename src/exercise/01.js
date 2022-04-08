// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// Compare the "Coverage" output between this style of import and the `lazy` import from `src/final/01.js`
import Globe from '../globe'

// 🐨 use React.lazy to create a Globe component which uses a dynamic import
// to get the Globe component from the '../globe' module.

function App() {
	const [showGlobe, setShowGlobe] = React.useState(false)

	// 🐨 wrap the code below in a <React.Suspense /> component
	// with a fallback.
	// 💰 try putting it in a few different places and observe how that
	// impacts the user experience.
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				height: '100%',
				padding: '2rem',
			}}
		>
			<label style={{marginBottom: '1rem'}}>
				<input
					// Without the "lazy loading", the user has to wait for the <Globe/> to be FULLY loaded before they can see this checkbox
					type="checkbox"
					checked={showGlobe}
					onChange={e => setShowGlobe(e.target.checked)}
				/>
				{' show globe'}
			</label>
			<div style={{width: 400, height: 400}}>
				{showGlobe ? <Globe /> : null}
			</div>
		</div>
	)
}
// 🦉 Note that if you're not on the isolated page, then you'll notice that this
// app actually already has a React.Suspense component higher up in the tree
// where this component is rendered, so you *could* just rely on that one.

export default App
