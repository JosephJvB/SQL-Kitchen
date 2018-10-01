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

  
  // HANDLE CURSOR
  let newCursorIdx = terminalCursorIndex
  // handle arrow keys
  if (event.key === 'ArrowRight') newCursorIdx = terminalCursorIndex - 1
  if (event.key === 'ArrowLeft') newCursorIdx = terminalCursorIndex + 1
  // dont go above or below
  if (newCursorIdx > terminalText.length) newCursorIdx = terminalText.length
  if (newCursorIdx < 0) newCursorIdx = 0
  // if new cursor position, update in redux
  if (newCursorIdx !== terminalCursorIndex) updateCursorIndex(newCursorIdx)
  
  // HANDLE ACTION KEYS
  const nextCharacterPosition = terminalText.length - newCursorIdx
  const textArray = terminalText.split('')
  // cant splice a string: split to array, splice, then join
  // cant chain array methods with .splice
  // https://stackoverflow.com/questions/15082553/js-splice-returns-removed-item
  // BACKSPACE
  if (event.key === 'Backspace') {
    // remove one item from the position of the cursor
    textArray.splice(nextCharacterPosition - 1, 1)
    tempUpdateTerminalText(textArray.join(''))
  }
  // ENTER
  //https://stackoverflow.com/questions/37557990/detecting-combination-keypresses-control-alt-shift/37559790
  if (event.key === 'Enter') {
    // if ends with semi colon, submit
    if(terminalText[terminalText.length - 1] === ';') {
      updateTerminalText(terminalText)
    } else {
      // insert new line
      textArray.splice(nextCharacterPosition, 0, '\n')
      tempUpdateTerminalText(textArray.join(''))
    }
  }
}

// KEYPRESS FOR PRINTABLE KEYS: alphas, numbers, characters
const handleKeyPress = (event, options) => {
  const {
    terminalCursorIndex,
    tempUpdateTerminalText,
    terminalText,
  } = options

  const nextCharacterPosition = terminalText.length - terminalCursorIndex

  // enter seems to be evaluated as a 'printable key'. Ignore it or string 'Enter' is printed.
  if(event.key !== 'Enter') {
    // same splice trickery as above
    const textArray = terminalText.split('')
    // insert the pressed key at the cursor position
    textArray.splice(nextCharacterPosition, 0, event.key)
    tempUpdateTerminalText(textArray.join(''))
  } 
}

module.exports = {
  handleKeyDown,
  handleKeyPress
}