const render = require('react-dom').render
const h = require('react-hyperscript')
const {
	connect: connectRedux,
	Provider: ReduxProvider
} = require('react-redux')
const { compose, withStateHandlers } = require('recompose')

const reduxStore = require('./redux')

const rootElement = document.getElementById('welcome!')
const rootComponent = compose(
	withStateHandlers(
		() => ({
			data: null
		}),
		{
			loadData: () => (res) => ({data: res.data})
		}
	)
)(props => h('div', {}, [
		h('h3', 'Welcome madame(s) or monsieur(s) a le SQL-Kitchen'),
		h('button', {
			onClick: () => fetchTest('/api', {method: 'get'}, props.loadData)
		}, 'FETCH TESTER'),
		h('div', {}, [
			props.data && props.data.map(i => {
				return h('h1', {key: Object.keys(i)[0]}, Object.keys(i)[0])
			})
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
		.then(handler)
		.catch(console.log)
}
