// USED IN ./terminal-components.js

// keyDown v keyPress: https://stackoverflow.com/questions/4843472/javascript-listener-keypress-doesnt-detect-backspace

// KEYDOWN FOR NON-PRINTABLE: control, backspace, arrows
const handleKeyDown = (event, options) => {
  const {
    tempUpdateTerminalText,
    terminalCursorIndex,
    terminalText,
    updateCursorIndex,
    updateTerminalText,
  } = options

  // CURSOR
  let newCursorIdx = terminalCursorIndex
  // handle arrow keys
  if (event.key === 'ArrowRight') newCursorIdx = terminalCursorIndex - 1
  if (event.key === 'ArrowLeft') newCursorIdx = terminalCursorIndex + 1
  // dont go above or below
  if (newCursorIdx > terminalText.length) newCursorIdx = terminalText.length
  if (newCursorIdx < 0) newCursorIdx = 0
  // if new cursor position, update in redux
  if (newCursorIdx !== terminalCursorIndex) updateCursorIndex(newCursorIdx)

  // BACKSPACE
  if (event.key === 'Backspace') tempUpdateTerminalText(terminalText.substring(0, terminalText.length - 1))

  // ENTER
  //https://stackoverflow.com/questions/37557990/detecting-combination-keypresses-control-alt-shift/37559790
  if (event.key === 'Enter') {
    // if shift is held: newline, else submit
    event.shiftKey
      ? tempUpdateTerminalText(terminalText + '\n')
      : updateTerminalText(terminalText)
  }
}

// KEYPRESS FOR PRINTABLE KEYS: alphas, numbers, characters
const handleKeyPress = (event, options) => {
  const {
    tempUpdateTerminalText,
    terminalText,
  } = options
  // enter seems to be evaluated as a 'printable key'. Ignore it or string 'Enter' is printed.
  if(event.key !== 'Enter') {
    tempUpdateTerminalText(terminalText + event.key)
  } 
}

module.exports = {
  handleKeyDown,
  handleKeyPress
}