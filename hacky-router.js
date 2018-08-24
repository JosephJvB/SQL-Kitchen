const h = require('react-hyperscript')
const { location: { pathname } } = window

const Home = require('./home-page')
const Table = require('./table-page')

module.exports = () => pathname === '/'
  ? h(Home)
    : pathname === '/table'
    ? h(Table)
  : h('h1', 'You broke my app! Ya great big bully')