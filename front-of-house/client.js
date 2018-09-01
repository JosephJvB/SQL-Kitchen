// react
const render = require('react-dom').render
const h = require('react-hyperscript')
// redux
const { Provider: ReduxProvider } = require('react-redux')
const {
	createStore,
	applyMiddleware,
	combineReducers,
} = require('redux')
// extended redux stuff
const thunkMiddleware = require('redux-thunk').default
const getPersistMiddleware = require('redux-persist-middleware').default
const { getConfiguredCache } = require('money-clip')
// local modules
const joesReducers = require('./redux').joesReducers
const HackyRouter = require('./hacky-router')
const rootElement = document.getElementById('welcome!')

// PERSIST CONFIG: can move these to a util place if I wanted
const cache = getConfiguredCache({
	version: 1, // what does this do? Look at money-clip..
	maxAge: 1200000, // assumption that it accepts ms
	name: 'Petunia',
})
const persistMiddleware = getPersistMiddleware({
	cacheFn: cache.set,
	logger: console.info,
	actionMap: {
		BURNTHEMALL: ['homeData', 'tableData', 'view'],
		SET_HOME_DATA: ['homeData'],
		SET_TABLE_DATA: ['tableData'],
		CHANGE_VIEW: ['view'],
		REMOVE_TABLE_ITEM: ['tableData']
	}
})

// wrap up in a warm cache jacket
cache.getAll().then((data) => {
	const reduxStore = createStore(
		combineReducers(joesReducers),
		data, // cacheData
		applyMiddleware(thunkMiddleware, persistMiddleware)
	)
	// this is where the magic happens
	render(
		h(ReduxProvider, { store: reduxStore }, [
			h(HackyRouter),
		]),
		rootElement
	)
})
// wat
.catch((err) => {
	console.error('WEE WOO WEE WOO:\n\n', err)
// 	const STORE = createStore()
// 	console.log(STORE)
// 	render(
// 		h('button', {
// 			onClick: () => STORE.dispatch(nukeRedux())
// 		}, 'BURNTHEMALL'),
// 		rootElement
// 	)
})
