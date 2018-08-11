const render = require('react-dom').render
const h = require('react-hyperscript')
const { compose, withStateHandlers } = require('recompose')

const rootElement = document.getElementById('welcome!')
const rootComponent = compose(
	withStateHandlers(
		() => ({
			data: null
		}),
		{
			loadData: () => (res) => ({data: res.data})
		}
	))(props => h('div', {}, [
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

render(h(rootComponent), rootElement)


function fetchTest(url, options, handler) {
	return fetch(url, options)
		.then(res => res.json())
		.then(handler)
		.catch(console.log)
}
