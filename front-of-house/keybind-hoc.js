const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const {
  TermActions,
  TermText
} = require('./terminal-components')
const {
  tempUpdateTerminalText,
  updateCursorIndex,
  updateTerminalText,
} = require('./redux').joesActions

const {
  handleKeyDown,
  handleKeyPress,
}= require('./keyboard-util')

// render a component in keybind-listening wrapper

module.exports = connectRedux(
({
  terminalCursorIndex,
  terminalText
}) => ({
  terminalCursorIndex,
  terminalText
}),
{
  tempUpdateTerminalText,
  updateCursorIndex,
  updateTerminalText,
}
)(({
  children: Component,
  tempUpdateTerminalText,
  terminalCursorIndex,
  terminalText,
  updateCursorIndex,
  updateTerminalText,
}) => h('div', {
      id: 'WRAPPER',
      style: Object.assign({}, Component.props.style),
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
    Component
  ])
)