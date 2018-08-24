// reducers
function homeData(state = [], action) {
  return action.type === 'SET_HOME_DATA' ? [].concat(action.data) : state
}

// actions
const setHomeData = ({data}) => ({
  type: 'SET_HOME_DATA',
  data
})

module.exports = {
  joesReducers: {
    homeData
  },
  setHomeData,
}