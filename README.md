# What I've learnt
###### *For more details, see `src/exercise/*.md` files*
-------------

## Code Splitting
- If your component is taking too much time/resource to load then define it [as a module](https://github.com/HelpMe-Pls/react-performance/blob/master/src/globe/index.js) then `export default` it.
- [Dynamically import](https://github.com/HelpMe-Pls/react-performance/blob/master/src/globe/index.js) (at line `7`,`26`,`27`) a module for "eager loading" (use this trick as a forecasted user's behavior).
- Use the Webpack comment `webpackPrefetch: true` (e.g. `import(/* webpackPrefetch: true */ './your-module.js')`) to **prefetch** the module (i.e. load the module AFTER everything else is loaded but BEFORE the user makes any interaction with that module)
- Use the `<React.Suspense />` component **to render a fallback** value while the user waits for the *lazily imported* module to be loaded. More details [at 01:15](https://epicreact.dev/modules/react-performance/code-splitting-suspense-position)
- One great way to analyze your app to determine the need/benefit of code splitting for a certain feature/page/interaction, is to use **Coverage** (more details [at 1:00](https://epicreact.dev/modules/react-performance/code-splitting-coverage-tool)). Compare these 2 examples ([with](https://github.com/HelpMe-Pls/react-performance/blob/master/src/final/01.js) `lazy` and [without](https://github.com/HelpMe-Pls/react-performance/blob/master/src/exercise/01.js) it) to see them in action. 


## `useMemo` - for expensive calculations
- `useMemo()` allows us to compare the *cached* **value** (i.e. an invoked function or anything that’s not a function or capable of returning other values) against its latest version. Its callback is only executed when *one of the dependencies* has changed. A good indicator for when to use it at [0:55](https://epicreact.dev/modules/react-performance/usememo-for-expensive-calculations-solution) 