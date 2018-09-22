const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const joeFetch = require('./fetch-util')
const {
	changeView,
	nukeRedux,
	setHomeData,
	setTableData,
	updateTerminalText,
} = require('./redux').joesActions

module.exports = connectRedux(
	({homeData, terminalText}) => ({homeData, terminalText}), // map state to props
	{ // pass actions as second argument to bind dispatch to actions
		changeView,
		nukeRedux,
		setHomeData,
		setTableData,
		updateTerminalText,
	}
)(({
	// props
	changeView,
	homeData,
	setHomeData,
	nukeRedux,
	setTableData,
	terminalText,
	updateTerminalText,
}) => h('div', {style: {padding: '1rem'}}, [
		h('div', {style: {display: 'flex', flexDirection: 'row'}, id: 'TABLES'}, [
			h('h1', {
				style: {marginRight: '2rem', cursor: 'pointer',},
				onClick: () => joeFetch(
					'/api/home',
					{method: 'get'},
					{
						success: ({RES, SQL}) => {
							updateTerminalText(SQL)
							setHomeData({data: RES})
						}
					}
					)
			}, homeData.length > 0 ? 'TABLE_LIST:' : 'GET_TABLES:'),
			// h('button', {style: {padding: '0 2rem'}},  'ADD NEW')
		]),
		// TABLE_DATA ELEMENTS
		h('div', {id: 'TABLES_META_DATA'}, [
			homeData.map(({tableName, columnData}) => h('div', {
				key: tableName,
				style: {border: '1px dashed #3AD12A', padding: '1rem'},
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
						{
							success: ({RES, SQL}) => {
								updateTerminalText(SQL)
								setTableData({data: RES})
							}
						}
					)
				}
				}, tableName + ': '),
				columnData.map((col, i) => h('p', {key: i},  col.column_name + '(' + col.data_type + ')'))
			]))
		]),
	])
)
