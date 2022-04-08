// Code splitting
// http://localhost:3000/isolated/final/01.js

import * as React from 'react'

// Using `React.lazy()` basically tells React to import this ON DEMAND (i.e. after everything else is loaded)
// Verify this by observing the "Network" tab (in the Devtools): refresh the page, see its ouput on the initial render, clear that up THEN click on the "Show globe", you'll see some more "chunks" (of the `lazy` thing) being loaded
const Globe = React.lazy(() => import('../globe'))

function App() {
	const [showGlobe, setShowGlobe] = React.useState(false)

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
					type="checkbox"
					checked={showGlobe}
					onChange={e => setShowGlobe(e.target.checked)}
				/>
				{' show globe'}
			</label>
			<div style={{width: 400, height: 400}}>
				<React.Suspense fallback={<div>loading globe...</div>}>
					{showGlobe ? <Globe /> : null}
				</React.Suspense>
			</div>
		</div>
	)
}

export default App
