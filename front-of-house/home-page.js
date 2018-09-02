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
}) => h('div', {}, [
		h('h3', 'Welcome madame(s) or monsieur(s) a le SQL-Kitchen'),
		h('button', {
			onClick: () => joeFetch(
				'/api/home',
				{method: 'get'},
				{success: setHomeData}
				)
		}, 'FETCH TESTER'),
		h('div', {}, [
			homeData.map(({tableName, columnData}) => h('div', {
				key: tableName,
				style: { border: '2px dotted red' },
			}, [
				h('h1', {
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
