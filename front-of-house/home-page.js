const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const joeFetch = require('./fetch-util')
const {
	changeView,
	setHomeData,
	setTableData,
	updateTerminalText,
} = require('./redux').joesActions

module.exports = connectRedux(
	({homeData, terminalText}) => ({homeData, terminalText}), // map state to props
	{ // pass actions as second argument to bind dispatch to actions
		changeView,
		setHomeData,
		setTableData,
		updateTerminalText,
	}
)(({
	// props
	changeView,
	homeData,
	setHomeData,
	setTableData,
	terminalText,
	updateTerminalText,
}) => h('div', {style: {width: '80%', margin: 'auto'}}, [
		// HEADER
		h('div', {style: {display: 'flex', flexDirection: 'row'}, id: 'HEADER'}, [
			h('div', {style: {backgroundColor: '#082E38', border: '3px solid #718093', padding: '0 2rem 0 0.5rem', display: 'flex', flexDirection: 'row', minWidth: '70%'}}, [
				h('p', {style: {color: '#f1f2f6'}}, '@ SQL_KITCHEN'),
				h('p', {style: {color: '#fff200', marginRight: '0.5rem'}}, '$:'),
				h('p', {style: {color: '#3AD12A'}}, terminalText),
			])
		]),
		h('div', {style: {display: 'flex', flexDirection: 'row'}, id: 'GET_TABLES'}, [
			h('h1', {
				style: {marginRight: '2rem', cursor: 'pointer',},
				onClick: () => joeFetch(
					'/api/home',
					{method: 'get'},
					{
						success: (result) => {
							updateTerminalText('select table_name from information_schema.tables where table_schema = \'public\'\n\n--for each table_name--\n\nselect column_name, data_type from information_schema.columns where table_name = $1')
							setHomeData(result)
						}
					}
					)
			}, 'GET_TABLES:'),
			// h('button', {style: {padding: '0 2rem'}},  'ADD NEW')
		]),
		// TABLE_DATA ELEMENTS
		h('div', {id: 'TABLES_META_DATA'}, [
			homeData.map(({tableName, columnData}) => h('div', {
				key: tableName,
				style: { border: '2px dotted #3AD12A', padding: '0.5rem 2rem' },
			}, [
				h('h1', {
					style: {
						cursor: 'pointer'
					},
					onClick: () => {
					changeView({location: 'TABLE', params: tableName})
					return joeFetch(
						`/api/table/${tableName}`,
						{method: 'get'},
						{success: setTableData}
					)
				}
				}, tableName + ': '),
				columnData.map((col, i) => h('p', {key: i},  col.column_name + '(' + col.data_type + ')'))
			]))
		])
	])
)
