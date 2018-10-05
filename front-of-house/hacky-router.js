const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const KeyBindHOC = require('./keybind-hoc')
const Home = require('./home-page')
const Table = require('./table-page')
const {
  TermActions,
  TermText
} = require('./terminal-components')
const {
  changeView,
} = require('./redux').joesActions

module.exports = connectRedux(
  // selector
  ({
    view: {location, params},
    isFullScreen,
  }) => ({
    location,
    params,
    isFullScreen,
  }),
  { // actions go here
    changeView,
  }
)(({
  // props
  changeView,
  location,
  params,
  isFullScreen,
}) => {
    const height = isFullScreen ? '100vh' : '85vh'
    const width = isFullScreen ? '97vw' : '85vw'
    switch(location) {
      case 'HOME': return h(KeyBindHOC, {}, [
          h('div', {style: {width, borderRadius: '10px 10px 0 0', margin: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#082E38', border: '1px solid #718093'}}, [
          h(TermActions),
          h('div', {style:{overflowX: 'hidden', overflowY: 'scroll', height}}, [
            h(TermText),
            h(Home, {params})
          ])
        ])
      ])
      case 'TABLE': return h(KeyBindHOC, {}, [
          h('div', {style: {width, borderRadius: '10px 10px 0 0', margin: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#082E38', border: '1px solid #718093'}}, [
          h(TermActions),
          h('div', {style:{overflowX: 'hidden', overflowY: 'scroll', height}}, [
            h(TermText),
            h(Table, {params})
          ])
        ])
      ])
      default: return h('h1', {
        onClick: () => changeView({location: 'HOME'}) // take me home country roads
      }, 'You broke my app! Ya great big bully')
    }
  }
)
