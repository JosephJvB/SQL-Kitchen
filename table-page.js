const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const { changeView } = require('./redux').joesActions

module.exports = connectRedux(
  mrGetter, // statik selektah
  { changeView } // wrap actions in dispatch
)(({
  // props
  changeView,
  itemData,
  metaData,
  params: tableName,
}) => h('div', [
    h('h1', 'TABLE_NAME: ' + tableName),
    h('ul', [
      // print table-ish format
      h('li', '|-- ' + metaData.join(' --|-- ') + ' --|'),
      itemData.map((item, i) => h('li', {key: i},  '|-- ' + item.join(' --|-- ') + ' --|'))
    ]),
    h('button', {
      onClick: () => changeView({location: 'HOME'})
    }, 'BACK THAT UP')
  ])
)

// first bootleg selector in this project 😂 👌 who did this lmaooo
function mrGetter ({tableData, homeData}, {params: tableName}) {
  // shape itemData from tableData(redux)
  const itemData = tableData.reduce((acc, item, i) => {
    acc.push(Object.keys(item).map(val => item[val])) // push item data for all items
    return acc
  }, [])
  // shape metaData from homeData(redux)
  const metaData = homeData.find(table => table.tableName === tableName).columnData.reduce((acc, col, i) => {
    acc.push(col.column_name + '(' + col.data_type + ')')
    return acc
  },[])
  return { itemData, metaData }
}
/*
  meta data from homeData.columnData (where homeData[i].tableName === params(aka tableName))
  tableData comes in looking like [{col: value, col: value, col: value}, {}, ...]
  columns look like this:
  |---name(type)---|---name(type)---|---name(type)---| - from homeData
  |---val---|---val---|---val---| - tableData[0]
  |---val---|---val---|---val---| - tableData[1]
  ...etc

  create object(ARRAY) like this:
  itemData = [
    ['colName+colType', 'colName+colType', ..],
    ['value', 'value', ...], - item1,
    [], - item2
    ...
  ]
*/