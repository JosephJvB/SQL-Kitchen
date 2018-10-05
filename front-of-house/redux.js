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
function forceLinebreaks (str) {
  if(!str) return ''
  const brokeStr = str.match(/.{1,35}/g)
  const fixStr = brokeStr.join('\n')
  return fixStr
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