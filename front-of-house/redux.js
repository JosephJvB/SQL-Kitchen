// reducers = functions
function homeData (state = [], action) {
  switch(action.type) {
    case 'SET_HOME_DATA': return action.data
    case 'BURNTHEMALL': return []
    default: return state
  }
}

function tableData (state = [], action) {
  switch(action.type) {
    case 'SET_TABLE_DATA': return action.data
    case 'REMOVE_TABLE_ITEM': return [].concat(state.filter(i => i.id !== action.id))
    case 'ADD_TABLE_ITEM': return [].concat(state, action.item)
    case 'BURNTHEMALL': return []
    default: return state
  }
}

function view (state = {location: 'HOME', params: null}, action) {
  switch(action.type){
    case 'CHANGE_VIEW': return action.viewData
    case 'BURNTHEMALL': return {location: 'HOME', params: null}
    default: return state
  }
}

function terminalText (state = 'bon_appetit!', action) {
  switch(action.type) {
    case 'UPDATE_TERMINAL_TEXT': return action.text
    case 'TEMP_UPDATE_TERMINAL_TEXT': return action.text
    case 'BURNTHEMALL': return 'bon-appetit!'
    default: return state
  }
}

function terminalCursorIndex (state = 0, action) {
  switch(action.type) {
    case 'UPDATE_CURSOR_IDX': return action.idx
    default: return state
  }
}

function isFullScreen (state = false, action) {
  switch(action.type) {
    case 'SET_FULLSCREEN': return !state
    default: return state
  }
}

// actions = consts. why? because I say so
const setHomeData = ({data}) => ({
  type: 'SET_HOME_DATA',
  data
})

const setTableData = ({data}) => ({
  type: 'SET_TABLE_DATA',
  data
})

const removeTableItem = ([{id}]) => ({
  type: 'REMOVE_TABLE_ITEM',
  id
})

const addTableItem = (item) => ({
  type: 'ADD_TABLE_ITEM',
  item
})

const nukeRedux = () => ({ type: 'BURNTHEMALL' })

const changeView = (viewData) => ({
  type: 'CHANGE_VIEW',
  viewData // lazy rename of action.payload 
})

const updateTerminalText = (text) => ({
  type: 'UPDATE_TERMINAL_TEXT',
  text: forceLinebreaks(text)
})

const tempUpdateTerminalText = (text) => ({
  type: 'TEMP_UPDATE_TERMINAL_TEXT',
  text: forceLinebreaks(text)
})

const setFullScreen = () => ({ type: 'SET_FULLSCREEN' })

const updateCursorIndex = (idx) => ({
  type: 'UPDATE_CURSOR_IDX',
  idx
})

// https://stackoverflow.com/questions/7033639/split-large-string-in-n-size-chunks-in-javascript
// /(.|\n){1,20}/g
function forceLinebreaks (str) {
  if(!str) return ''
  // const n = Number((window.innerWidth / 20).toString().split('.')[0])
  const n = 15
  let result = ''
  for (let i = 0; i < str.length; i++) {
    // newline every n letters since the last newline or start of string...
    const newLineCondition = i > 0 && str[i] !== '\n' && (
      str.substring(0, i+1) === str && i+1 === n // start of string: WORKS
      || str.substring(str.lastIndexOf('\n'), i + 1).length === n
    )

    str.includes('\n') && console.log(
      str[i] === '\n',
      str.substring(str.lastIndexOf('\n'), i + 1)
    )

    if(newLineCondition) result += '\n'
    result +=str[i]
  }
  // console.log(result, n)
  return result
}

// trying different exports cos that seems like fun
module.exports.joesReducers = {
  homeData,
  isFullScreen,
  terminalCursorIndex,
  terminalText,
  tableData,
  view
}
module.exports.joesActions = {
  addTableItem,
  changeView,
  nukeRedux,
  removeTableItem,
  setFullScreen,
  setHomeData,
  setTableData,
  tempUpdateTerminalText,
  updateCursorIndex,
  updateTerminalText,
}