// react
const render = require('react-dom').render
const h = require('react-hyperscript')
// redux
const {
	connect: connectRedux,
	Provider: ReduxProvider
} = require('react-redux')
const {
	createStore,
	applyMiddleware,
	compose: composeRedux,
} = require('redux')
// extended redux stuff
const thunkMiddleware = require('redux-thunk').default
const getPersistMiddleware = require('redux-persist-middleware').default
const { getConfiguredCache } = require('money-clip')

const {
	rootReducer,
	setHomeData,
} = require('./redux')

// PERSIST CONFIG
const cache = getConfiguredCache({
	version: 1, // what does this do? Look at money-clip..
	maxAge: 1200000, // assumption that it accepts ms
	name: 'Petunia',
})

const persistMiddleware = getPersistMiddleware({
	cacheFn: cache.set,
	logger: console.info,
	actionMap: { SET_HOME_DATA: ['homeData'] }
})

const rootElement = document.getElementById('welcome!')
const rootComponent = connectRedux(
	({homeData}) => ({  // mapStateToProps
		homeData,
	}),
	{ setHomeData } // pass actions as second argument to bind dispatch
)(({
	// props
	homeData,
	setHomeData,
}) => h('div', {}, [
		h('h3', 'Welcome madame(s) or monsieur(s) a le SQL-Kitchen'),
		h('button', {
			onClick: () => fetchTest('/api/home', {method: 'get'}, setHomeData)
		}, 'FETCH TESTER'),
		h('div', {}, [
			homeData.map(({tableName, columnData}) => h('div', {
				key: tableName,
				style: { border: '2px dotted red' },
				onClick: () => fetchTest(`/api/table/${tableName}`, {method: 'get'}, console.log)
			}, [
				h('h1', tableName + ': '),
				columnData.map((col, i) => h('p', {key: i},  col.column_name + '(' + col.data_type + ')'))
			]))
		])
	])
)

// wrap up in a warm cache jacket
cache.getAll().then((data) => {
	const reduxStore = createStore(
		rootReducer,
		data, // cacheData
		applyMiddleware(thunkMiddleware, persistMiddleware)
	)
	// this is where the magic happens
	render(
		h(ReduxProvider, { store: reduxStore }, [
			h(rootComponent)
		]),
		rootElement
	)
})


function fetchTest(url, options, handler) {
	return fetch(url, options)
		.then(res => res.json())
		// .then(console.log)
		.then(handler) // set data in redux state
		.catch(console.log)
}
