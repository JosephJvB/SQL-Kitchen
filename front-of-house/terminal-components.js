const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

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
  ({ terminalText }) => ({ terminalText }),
  {} // actions
  )(({ // props
    terminalText
  }) => h('div', {
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