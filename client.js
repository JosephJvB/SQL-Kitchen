const render = require('react-dom').render
const h = require('react-hyperscript')

const rootElement = document.getElementById('welcome!')
const rootComponent = h('h1', 'HELLO KITCHEN')

document.addEventListener('DOMContentLoaded', () => render(rootComponent, rootElement))