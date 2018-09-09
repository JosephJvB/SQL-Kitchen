const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const {
  changeView,
  nukeRedux,
} = require('./redux').joesActions
const Home = require('./home-page')
const Table = require('./table-page')

// needs to move out of the house at some point..
const TermScreen = ({terminalText}) => [
    h('div', {key: 'DJ', style: {height: '20px', width: '100%', backgroundColor: '#dcdde1', borderRadius: '5px 5px 2px 2px', display: 'flex', flexDirection: 'row', border: '0.5px solid #b3b5be'}}, [
    // red 
    h('div', {style: {height: '13px', width: '13px', border: '0.5px solid #bf2718', backgroundColor: '#e74c3c', marginLeft: '0.6rem', marginTop: '3px', borderRadius: '10px'}}),
    // yellow
    h('div', {style: {height: '13px', width: '13px', border: '0.5px solid #dba204', backgroundColor: '#fbc531', marginLeft: '0.6rem', marginTop: '3px', borderRadius: '10px'}}),
    // green
    h('div', {style: {height: '13px', width: '13px', border: '0.5px solid #28911d', backgroundColor: '#3AD12A', marginLeft: '0.6rem', marginTop: '3px', borderRadius: '10px'}}),
  ]),
  h('div', {key: 'KHALED', style: {display: 'flex', flexDirection: 'row'}, id: 'TERM_SCREEN'}, [
    h('div', {style: {padding: '0 2rem 0 0.5rem', display: 'flex', flexDirection: 'row', whiteSpace: 'pre-wrap', width: '100%', borderTop: 'none'}}, [
      h('p', {style: {color: '#f1f2f6', paddingRight: '0.5rem'}}, 'SQL_KITCHEN'),
      h('p', {style: {color: '#fff200', paddingRight: '0.5rem'}}, '$:'),
      h('p', {style: {color: '#3AD12A'}}, terminalText),
      // note that cursor is not in the right place when termText is multi-line.
      h('p', {id: 'BLINKING_CURSOR', style: {color: '#fff200'}}, '_'),
    ])
  ])
]

module.exports = connectRedux(
  // selector
  ({
    view: {location, params},
    terminalText
  }) => ({
    location,
    params,
    terminalText
  }),
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
      case 'HOME': return h('div', {style: {borderRadius: '10px 10px 0 0', width: '80%', margin: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#082E38', border: '1px solid #718093'}}, [
        h(TermScreen, {terminalText}),
        h(Home, {params})
      ])
      case 'TABLE': return h('div', {style: {borderRadius: '10px 10px 0 0', width: '80%', margin: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#082E38', border: '1px solid #718093'}}, [
        h(TermScreen, {terminalText}),
        h(Table, {params})
      ])
      default: return h('h1', {
        onClick: () => changeView({location: 'HOME'}) // take me home country roads
      }, 'You broke my app! Ya great big bully')
    }
  }
)
