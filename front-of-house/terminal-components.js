const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const {
  tempUpdateTerminalText,
  updateCursorIndex,
  updateTerminalText
} = require('./redux').joesActions

const alphabetAndNumbers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '=', '\'', , '"', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const {
  nukeRedux,
  setFullScreen,
} = require('./redux').joesActions

const TermActions = connectRedux(
  // selector
  () => ({}),
  { // actions
    nukeRedux,
    setFullScreen
  }
  )(({ // props
      nukeRedux,
      setFullScreen
    }) => h('div', {key: 'DJ', style: {minHeight: '20px', width: '100%', backgroundColor: '#dcdde1', borderRadius: '5px 5px 2px 2px', display: 'flex', flexDirection: 'row', border: '0.5px solid #b3b5be'}}, [
      // red 
      h('div', {onClick: nukeRedux, style: {height: '13px', width: '13px', border: '0.5px solid #bf2718', backgroundColor: '#e74c3c', marginLeft: '0.6rem', marginTop: '3px', borderRadius: '10px'}}),
      // yellow
      h('div', {style: {height: '13px', width: '13px', border: '0.5px solid #dba204', backgroundColor: '#fbc531', marginLeft: '0.6rem', marginTop: '3px', borderRadius: '10px'}}),
      // green
      h('div', {onClick: setFullScreen, style: {height: '13px', width: '13px', border: '0.5px solid #28911d', backgroundColor: '#3AD12A', marginLeft: '0.6rem', marginTop: '3px', borderRadius: '10px'}}),
    ]),
)
    
const TermText = connectRedux(
  // selector
  ({
    terminalCursorIndex,
    terminalText,
  }) => ({
    terminalCursorIndex,
    terminalText,
  }),
  {
    tempUpdateTerminalText,
    updateCursorIndex,
    updateTerminalText,
  } // actions
  )(({ // props
    terminalText,
    terminalCursorIndex,
    tempUpdateTerminalText,
    updateCursorIndex,
    updateTerminalText
  }) => h('div', {
        // tabIndex 0 means that a div element can have 'focus' and listen to keyboard events
        tabIndex: 0,
        // TODO: factor this into a helper function: *-util.js
        //        will have to pass object of actions into this function same as fetch-util
        // keyDown v keyPress: https://stackoverflow.com/questions/4843472/javascript-listener-keypress-doesnt-detect-backspace
        onKeyDown: (e) => {
          // for how to do string stuff:https://stackoverflow.com/questions/20817618/is-there-a-splice-method-for-strings/21350614#21350614
          // evaluate cursor position
          let newCursorIdx = terminalCursorIndex
          if (e.key === 'ArrowRight') newCursorIdx = terminalCursorIndex - 1
          if (e.key === 'ArrowLeft') newCursorIdx = terminalCursorIndex + 1
          if (e.key === 'Backspace') tempUpdateTerminalText(terminalText.substring(0, terminalText.length - 1))
          // enter to submit, shift enter for new line
          // https://stackoverflow.com/questions/37557990/detecting-combination-keypresses-control-alt-shift/37559790
          if (e.key === 'Enter') {
            e.shiftKey
              ? tempUpdateTerminalText(terminalText + '\n') // new line
              : updateTerminalText(terminalText) // submit
          }
          // dont go above or below
          if (newCursorIdx > terminalText.length) newCursorIdx = terminalText.length
          if (newCursorIdx < 0) newCursorIdx = 0
          // after evaluating new cursorIdx, update in redux
          console.log(newCursorIdx)
          updateCursorIndex(newCursorIdx)
        },
        // KEYPRESS FOR PRINTABLE KEYS: alphas, numbers, characters
        onKeyPress: (e) => {
          // enter seems to be evaluated as a 'printable key'. Ignore it or string 'Enter' is printed.
          if(e.key !== 'Enter') {
            tempUpdateTerminalText(terminalText + e.key)
          }
        },
        key: 'KHALED',
        style: {minHeight: 'fit-content', display: 'flex', flexDirection: 'row'},
        id: 'TERM_SCREEN'
      }, [
        h('div', {style: {padding: '0 2rem 0 0.5rem', display: 'flex', flexDirection: 'row', whiteSpace: 'pre-wrap', width: '100%', borderTop: 'none'}}, [
          h('p', {style: {color: '#f1f2f6', paddingRight: '0.5rem'}}, 'SQL_KITCHEN'),
          h('p', {style: {color: '#fff200', paddingRight: '0.5rem'}}, '$:'),
          h('p', {style: {color: '#3AD12A'}}, terminalText),
          // note that cursor is not in the right place when termText is multi-line.
          h('p', {id: 'BLINKING_CURSOR', style: {color: '#fff200'}}, '_'),
        ])
      ])
  )
      
module.exports = {
  TermActions,
  TermText,
}