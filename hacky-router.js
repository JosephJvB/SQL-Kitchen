const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const { changeView } = require('./redux').joesActions
const Home = require('./home-page')
const Table = require('./table-page')

module.exports = connectRedux(
  ({view: {location, params}}) => ({location, params}), // selector
  { changeView } // actions go here
)(({
  // props
  changeView,
  location,
  params
}) => {
    switch(location) {
      case 'HOME': return h(Home, params)
      case 'TABLE': return h(Table, params)
      default: return h('h1', {
        onClick: () => changeView({location: 'HOME'}) // take me home country roads
      }, 'You broke my app! Ya great big bully')
    }
  }
)
