const render = require('react-dom').render
const h = require('react-hyperscript')

const rootElement = document.getElementById('welcome!')
const rootComponent = h('div', {}, [
		h('h3', 'Welcome madame(s) or monsieur(s) a le SQL-Kitchen'),
		h('button', {
			onClick: () => fetchTest('/api', {method: 'get'})
		}, 'FETCH TESTER')
	])

render(rootComponent, rootElement)


function fetchTest(url, options) {
	return fetch(url, options)
		.then(response => {
			console.log('fetch response11', response)
		})
		.catch(console.log)
}
