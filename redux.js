const {
	createStore,
	applyMiddleware,
	compose: composeRedux,
	combineReducers,
} = require('redux')
const thunkMiddleware = require('redux-thunk').default

const reducers = combineReducers({
  pants
})

const reduxStore = createStore(reducers, composeRedux(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

function pants(state = [], action) { // placeholder reducer
  return action.type === 'GET_PANTS' ? [].concat(state, action.pants) : state
}

const getPants = () => ({
  type: 'GET_PANTS',
  pants: ['short', 'skirt', 'long-jacket']
}) 

module.exports = {
  getPants,
  reduxStore
}