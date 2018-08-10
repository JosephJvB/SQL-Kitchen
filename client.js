const render = require('react-dom').render
const h = require('react-hyperscript')

const rootElement = document.getElementById('welcome!')
const rootComponent = h('h3', 'Welcome madame(s) or monsieur(s) a le SQL-Kitchen')

render(rootComponent, rootElement)