const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

// look at tabledata from redux, and render column titles - then data for each item under those headings

module.exports = connectRedux(
  mrGetter, // mapper
  {} // wrap actions in dispatch
)(({
  // props
  itemData,
}) => h('ul', [
  itemData.map((item, i) => h('li', {key: i},  '|-- ' + item.join(' --|-- ') + ' --|'))
  ])
)

// first bootleg selector in this project 😂 👌 who did this lmaooo
function mrGetter (state) {
  const smoovData = state.tableData.reduce((acc, item, i) => {
    if(i === 0) acc.push(Object.keys(item))
    else acc.push(Object.keys(item).map(val => item[val]))
    return acc
  }, [])
  return { itemData: smoovData }
}
/*
  itemData = [
    [], - meta
    [], - item1,
    [], - item2
    ...
  ]
*/