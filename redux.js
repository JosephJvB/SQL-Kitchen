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
    case 'SET_TABLE_DATA': return action.rowData
    case 'REMOVE_TABLE_ITEM': return [].concat(state.filter(i => i.id !== action.id))
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

const nukeRedux = () => ({ type: 'BURNTHEMALL' })

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