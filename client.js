const render = require('react-dom').render
const h = require('react-hyperscript')
const {
	connect: connectRedux,
	Provider: ReduxProvider
} = require('react-redux')

const {
	reduxStore,
	setHomeData,
} = require('./redux')

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
				style: { border: '2px dotted red' }
			}, [
				h('h1', tableName + ': '),
				columnData.map((col, i) => h('p', {key: i},  col.column_name + '(' + col.data_type + ')'))
			]))
		])
	])
)

// this is where the magic happens
render(
	h(ReduxProvider, { store: reduxStore }, [
		h(rootComponent)
	]),
	rootElement
)


function fetchTest(url, options, handler) {
	return fetch(url, options)
		.then(res => res.json())
		// .then(console.log)
		.then(handler) // set data in redux state
		.catch(console.log)
}
