const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const joeFetch = require('./fetch-util')
const {
  changeView,
  removeTableItem,
} = require('./redux').joesActions

module.exports = connectRedux(
  mrGetter, // statik selektah
  {
    changeView,
    removeTableItem,
  } // wrap actions in dispatch
)(({
  // props
  changeView,
  itemData,
  metaData,
  params: tableName,
  removeTableItem,
}) => h('div', [
    h('h1', 'TABLE_NAME: ' + tableName),
    h('ul', [
      // print table-ish format
      h('li', '|-- ' + metaData.join(' --|-- ') + ' --|'),
      itemData.map((item, i) => h('li', {
        key: i,
        onClick: () => joeFetch(
          '/api/deleteRow',
          {
            method: 'delete',
            body: { table: tableName, id: item[0] }, // item: [id, val, val] (id always first)
          },
          { success: removeTableItem }
        )
      },  '|-- ' + item.join(' --|-- ') + ' --|'))
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
  // find tableMetaData from homeData, get columnMetaData, shape that with reduce
  const metaData = homeData.find(table => table.tableName === tableName).columnData.reduce((acc, col, i) => {
    acc.push(col.column_name + '(' + col.data_type + ')')
    return acc
  },[])
  return { itemData, metaData }
}
/*
end result:
|---name(type)---|---name(type)---|---name(type)---| - from homeData
|---val---|---val---|---val---| - tableData[0]
|---val---|---val---|---val---| - tableData[1]
...etc

  meta data from homeData.columnData (where homeData[i].tableName === params(aka tableName))
  columnData comes in looking like [{colName: name, coldatatype: type}, {}, ...]
  create metaData = ['colName(type)', 'colName(type)', ...]
  1-D array of strings

  tableData comes in looking like [{col: value, col: value, col: value}, {}, ...]
  create itemData = [
    ['value', 'value', ...], - item1,
    ['value', 'value', ...], - item2,
    ...
  ]
  2-D array: array of arrays of strings [[string, string, ...]]
*/