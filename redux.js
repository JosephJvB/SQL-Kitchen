// reducers = functions
function homeData (state = [], action) {
  if(action.type === 'BURNTHEMALL') return []
  return action.type === 'SET_HOME_DATA'
  ? [].concat(action.data)
  : state
}

function tableData (state = [], action) {
  if(action.type === 'BURNTHEMALL') return []
  return action.type === 'SET_TABLE_DATA'
  ? [].concat(action.rowData)
  : state
}

function view (state = {location: 'HOME'}, action) {
  if(action.type === 'BURNTHEMALL') return {location: 'HOME'}
  return action.type === 'CHANGE_VIEW'
    ? action.viewData
    : state
}

// actions = consts. why? because I say so
const setHomeData = ({data}) => ({
  type: 'SET_HOME_DATA',
  data
})

const setTableData = ({rowData}) => ({
  type: 'SET_TABLE_DATA',
  rowData
})

const removeTableItem = ([{id}]) => ({
  type: 'REMOVE_TABLE_ITEM',
  id
})

const nukeRedux = () => ({
  type: 'BURNTHEMALL'
})

const changeView = (viewData) => ({
  type: 'CHANGE_VIEW',
  viewData // lazy rename of action.payload 
})

// trying different exports cos that seems like fun
module.exports.joesReducers = {
  homeData,
  tableData,
  view
}
module.exports.joesActions = {
  changeView,
  nukeRedux,
  removeTableItem,
  setHomeData,
  setTableData,
}