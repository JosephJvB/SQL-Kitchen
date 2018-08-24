const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

module.exports = connectRedux(
  (state) => ({}), // mapper
  {} // wrap actions in dispatch
)((props) => h('h1', 'TABLE PAGE'))