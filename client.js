const render = require('react-dom').render
const h = require('react-hyperscript')
const {
	connect: connectRedux,
	Provider: ReduxProvider
} = require('react-redux')

const {
	getPants,
	reduxStore
} = require('./redux')

const rootElement = document.getElementById('welcome!')
const rootComponent = connectRedux(
	state => ({pants: state.pants}), // mapStateToProps
	{ getPants } // pass actions as second argument to bind dispatch
)(props => {
	!props.pants.length && props.getPants()
	return h('div', {}, [
		h('h3', 'Welcome madame(s) or monsieur(s) a le SQL-Kitchen'),
		h('button', {
			onClick: () => fetchTest('/api', {method: 'get'}, props.loadData)
		}, 'FETCH TESTER'),
		h('div', {}, [
			// props.data && props.data.map(i => h('h1', {key: Object.keys(i)[0]}, Object.keys(i)[0]))
			props.pants && props.pants.map(p => h('p',{key: p}, p))
		])
	])
})

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
		// .then(handler)
		.then(console.log)
		.catch(console.log)
}
