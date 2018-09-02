const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const joeFetch = require('./fetch-util')
const {
	changeView,
	setHomeData,
	setTableData,
} = require('./redux').joesActions

module.exports = connectRedux(
	({homeData}) => ({homeData}), // map state to props
	{ // pass actions as second argument to bind dispatch to actions
		changeView,
		setHomeData,
		setTableData,
	}
)(({
	// props
	changeView,
	homeData,
	setHomeData,
	setTableData,
}) => h('div', {style: {width: '80%', margin: 'auto'}}, [
		// HEADER
		h('div', {style: {display: 'flex', flexDirection: 'row'}, id: 'HEADER'}, [
			h('h3', {style: {marginRight: '2rem'}}, 'Welcome madame(s) or monsieur(s) a le SQL-Kitchen:'),
			h('p', {style: {backgroundColor: '#2f3640', color: '#4cd137', border: '3px solid #718093', padding: '0.5rem 2rem'}}, '$:this will be the query bar'),
		]),
		h('div', {style: {display: 'flex', flexDirection: 'row'}, id: 'GET_TABLES'}, [
			h('h1', {
				style: {marginRight: '2rem', cursor: 'pointer',},
				onClick: () => joeFetch(
					'/api/home',
					{method: 'get'},
					{success: setHomeData}
					)
			}, 'GET_TABLES:'),
			// h('button', {style: {padding: '0 2rem'}},  'ADD NEW')
		]),
		// TABLE_DATA ELEMENTS
		h('div', {id: 'TABLES_META_DATA'}, [
			homeData.map(({tableName, columnData}) => h('div', {
				key: tableName,
				style: { border: '2px dotted red', padding: '0.5rem 2rem' },
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
