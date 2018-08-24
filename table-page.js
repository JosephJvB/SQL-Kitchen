const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

module.exports = connectRedux(
  mrGetter, // mapper
  {} // wrap actions in dispatch
)(({
  // props
  itemData,
}) => h('ul', [
  // print bootleg table format
  itemData.map((item, i) => h('li', {key: i},  '|-- ' + item.join(' --|-- ') + ' --|'))
  ])
)

// first bootleg selector in this project 😂 👌 who did this lmaooo
function mrGetter (state) {
  const smoovData = state.tableData.reduce((acc, item, i) => {
    if(i === 0) acc.push(Object.keys(item)) // push meta data just one time
    acc.push(Object.keys(item).map(val => item[val])) // push item data for all items
    return acc
  }, [])
  return { itemData: smoovData }
}
/*
  tableData comes in looking like [{col: value, col: value, col: value}, {}, ...]
  I want to render on the page like:
  |---col---|---col---|---col---| - from first item
  |---val---|---val---|---val---| - from first item
  |---val---|---val---|---val---| - from second item
  ...etc

  create object like this:
  itemData = [
    [], - meta (from item 1) all items have same meta
    [], - item1,
    [], - item2
    ...
  ]
*/