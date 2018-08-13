const {
	createStore,
	applyMiddleware,
	compose: composeRedux,
	combineReducers,
} = require('redux')
const thunkMiddleware = require('redux-thunk').default

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
const reducers = combineReducers({
  homeData,
})
const reduxStore = createStore(reducers, composeRedux(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

module.exports = {
  reduxStore,
  setHomeData,
}