const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const inputTypeMap = {
  integer: 'number',
  character: 'text'
}

const joeFetch = require('./fetch-util')
const {
  addTableItem,
  changeView,
  removeTableItem,
  updateTerminalText,
} = require('./redux').joesActions

module.exports = connectRedux(
  mrGetter, // statik selektah
  {
    addTableItem,
    changeView,
    removeTableItem,
    updateTerminalText,
  } // wrap actions in dispatch
)(({
  // props
  addTableItem,
  changeView,
  itemData,
  metaData,
  params: tableName,
  removeTableItem,
  updateTerminalText,
}) => h('div', [
    // title
    h('h1', 'TABLE_NAME: ' + tableName),
    h('ul', [
      // column names
      h('li', '|-- ' + metaData.join(' --|-- ') + ' --|'),
      // items data
      itemData.map((item, i) => h('li', {
        key: i,
        onClick: () => joeFetch(
          `/api/deleteRow/${tableName}/${item[0]}`, // item[0]=id: [id, val, val] (id always first)
          { method: 'delete' },
          {
            success: ({RES, SQL}) => {
              // term
              updateTerminalText(SQL)
              // state/cache
              removeTableItem(RES)
            }
          }
        )
      },  '|-- ' + item.join(' --|-- ') + ' --|'))
    ]),
    // add item input
    h('form', {
      onSubmit: (e) => {
        e.persist() // persist to access event after async DB call (react thing)
        e.preventDefault() // preventDefault so form doesnt push thing to url
        // slice metaData to skip Id (will always be first)
        const formValues = metaData.slice(1).reduce((acc, colName, i) => acc.concat([{
          column: colName.split('(')[0],
          value: e.target[i].value
        }]), [])
        joeFetch(
          '/api/newRow',
          {
            method: 'post', 
            body: {
              table: tableName,
              items: formValues
            }
          },
          {
            success: ({RES, SQL}) => {
              updateTerminalText(SQL)
              // reset input values on success
              formValues.forEach((val, i) => e.target[i].value = null)
              // add item to state/cache
              addTableItem(RES)
           }
          }
        )
      }
    }, [
      h('h3', 'ADD AN ITEM'),
      // slice to remove ID. Dont allow user to input an ID value
      metaData.slice(1).map((colName, i) => h('input', {
        key: i,
        required: true,
        // take dataType from meta data, match it to html input type attribute
        type: inputTypeMap[colName.split('(')[1].split(')')[0]],
        placeholder: colName,
      })),
      h('button', {}, 'big but')
    ]),
    // back button
    h('h3', 'TAKE ME HOME COUNTRY ROADS'),
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