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
    ? action.location
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

const changeView = (location) => ({
  type: 'CHANGE_VIEW',
  location
})

module.exports = {
  joesReducers: {
    homeData,
    tableData,
    view
  },
  changeView,
  setHomeData,
  setTableData,
}