// reducers
const homeData = (state = [], action) => action.type === 'SET_HOME_DATA'
  ? [].concat(action.data)
  : state

// this will change big time when add/delete row functionality comes thru
const tableData = (state = [], action) => action.type === 'SET_TABLE_DATA'
  ? [].concat(action.rowData)
  : state

// actions
const setHomeData = ({data}) => ({
  type: 'SET_HOME_DATA',
  data
})

const setTableData = ({rowData}) => ({
  type: 'SET_HOME_DATA',
  rowData
})
  // console.log(data)

module.exports = {
  joesReducers: {
    homeData,
    tableData,
  },
  setHomeData,
  setTableData,
}