const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const Home = require('./home-page')
const Table = require('./table-page')

module.exports = connectRedux(
  ({view: {location, params}}) => ({location, params}), // selector
  {} // actions go here
)(({location, params}) => {
    switch(location) {
      case 'HOME': return h(Home, params)
      case 'TABLE': return h(Table, params)
      default: return h('h1', 'You broke my app! Ya great big bully')
    }
  }
)
