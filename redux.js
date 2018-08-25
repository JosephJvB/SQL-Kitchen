// reducers = functions
function homeData (state = [], action) {
 return action.type === 'SET_HOME_DATA'
  ? [].concat(action.data)
  : state
}

function tableData (state = [], action) {
  return action.type === 'SET_TABLE_DATA'
  ? [].concat(action.rowData)
  : state
}

function view (state = {location: 'HOME'}, action) {
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
  setHomeData,
  setTableData,
}