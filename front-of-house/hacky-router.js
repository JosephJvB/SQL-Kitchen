const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const {
  changeView,
  nukeRedux,
} = require('./redux').joesActions
const Home = require('./home-page')
const Table = require('./table-page')

// needs to move out of the house at some point..
const TermScreen = ({terminalText}) => h('div', {style: {display: 'flex', flexDirection: 'row'}, id: 'TERM_SCREEN'}, [
  h('div', {style: {backgroundColor: '#082E38', border: '3px solid #718093', padding: '0 2rem 0 0.5rem', display: 'flex', flexDirection: 'row', whiteSpace: 'pre-wrap', width: '100%'}}, [
    h('p', {style: {color: '#f1f2f6', paddingRight: '0.5rem'}}, 'SQL_KITCHEN'),
    h('p', {style: {color: '#fff200', paddingRight: '0.5rem'}}, '$:'),
    h('p', {style: {color: '#3AD12A'}}, terminalText),
  ])
])

module.exports = connectRedux(
  ({
    view: {location, params},
    terminalText
  }) => ({
    location,
    params,
    terminalText
  }), // selector
  { changeView } // actions go here
)(({
  // props
  changeView,
  location,
  params,
  terminalText
}) => {
  // nukeRedux()
    switch(location) {
      case 'HOME': return h('div', {style: {width: '80%', margin: 'auto'}}, [
        h(TermScreen, {terminalText}),
        h(Home, {params})
      ])
      case 'TABLE': return h('div', {style: {width: '80%', margin: 'auto'}}, [
        h(TermScreen, {terminalText}),
        h(Table, {params})
      ])
      default: return h('h1', {
        onClick: () => changeView({location: 'HOME'}) // take me home country roads
      }, 'You broke my app! Ya great big bully')
    }
  }
)
