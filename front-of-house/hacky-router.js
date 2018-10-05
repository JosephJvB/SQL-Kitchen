const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const Home = require('./home-page')
const Table = require('./table-page')
const {
  TermActions,
  TermText
} = require('./terminal-components')
const {
  changeView,
  tempUpdateTerminalText,
  updateCursorIndex,
  updateTerminalText,
} = require('./redux').joesActions

const {
  handleKeyDown,
  handleKeyPress,
}= require('./keyboard-util')

module.exports = connectRedux(
  // selector
  ({
    view: {location, params},
    isFullScreen,
    terminalCursorIndex,
    terminalText,
  }) => ({
    location,
    params,
    isFullScreen,
    terminalCursorIndex,
    terminalText,
  }),
  { // actions go here
    changeView,
    tempUpdateTerminalText,
    updateCursorIndex,
    updateTerminalText,
  }
  )(({
    // props
    changeView,
    location,
    params,
    isFullScreen,
    tempUpdateTerminalText,
    terminalCursorIndex,
    terminalText,
    updateCursorIndex,
    updateTerminalText,
}) => {
    const height = isFullScreen ? '100vh' : '85vh'
    const width = isFullScreen ? '97vw' : '85vw'
    switch(location) {
      case 'HOME': return h('div', {
        style: {width, borderRadius: '10px 10px 0 0', margin: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#082E38', border: '1px solid #718093'},
        // tabIndex 0 means that a div element can have 'focus' and listen to keyboard events
        tabIndex: 0,
        // KEYDOWN FOR NON-PRINTABLE KEYS: control, backspace, arrows
        onKeyDown: (e) => handleKeyDown(e, {
          tempUpdateTerminalText,
          terminalCursorIndex,
          terminalText,
          updateCursorIndex,
          updateTerminalText,
        }),
        // KEYPRESS FOR PRINTABLE KEYS: alphas, numbers, characters: '', "", []
        onKeyPress: (e) => handleKeyPress(e, {
          terminalCursorIndex,
          tempUpdateTerminalText,
          terminalText,
        }),
      }, [
        h(TermActions),
        h('div', {style:{overflowX: 'hidden', overflowY: 'scroll', height}}, [
          h(TermText),
          h(Home, {params})
        ])
      ])
      case 'TABLE': return h('div', {
        style: {width, borderRadius: '10px 10px 0 0', margin: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#082E38', border: '1px solid #718093'},
        // tabIndex 0 means that a div element can have 'focus' and listen to keyboard events
        tabIndex: 0,
        // KEYDOWN FOR NON-PRINTABLE KEYS: control, backspace, arrows
        onKeyDown: (e) => handleKeyDown(e, {
          tempUpdateTerminalText,
          terminalCursorIndex,
          terminalText,
          updateCursorIndex,
          updateTerminalText,
        }),
        // KEYPRESS FOR PRINTABLE KEYS: alphas, numbers, characters: '', "", []
        onKeyPress: (e) => handleKeyPress(e, {
          terminalCursorIndex,
          tempUpdateTerminalText,
          terminalText,
        }),
      }, [
        h(TermActions),
        h('div', {style:{overflowX: 'hidden', overflowY: 'scroll', height}}, [
          h(TermText),
          h(Table, {params})
        ])
      ])
      default: return h('h1', {
        onClick: () => changeView({location: 'HOME'}) // take me home country roads
      }, 'You broke my app! Ya great big bully')
    }
  }
)
