const { combineReducers } = require('redux')

// reducers
function homeData(state = [], action) {
  return action.type === 'SET_HOME_DATA' ? [].concat(state, action.data) : state
}

// actions
const setHomeData = ({data}) => ({
  type: 'SET_HOME_DATA',
  data
})

// redux config
const rootReducer = combineReducers({
  homeData,
})

module.exports = {
  rootReducer,
  setHomeData,
}