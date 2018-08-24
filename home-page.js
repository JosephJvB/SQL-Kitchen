const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

const joeFetch = require('./fetch-util')
const { setHomeData } = require('./redux')

module.exports = connectRedux(
	({homeData}) => ({  // mapStateToProps
		homeData,
	}),
	{ setHomeData } // pass actions as second argument to bind dispatch
)(({
	// props
	homeData,
	setHomeData,
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
					onClick: () => joeFetch(
						`/api/table/${tableName}`,
						{method: 'get'},
						{success: console.log}
					)
				}, tableName + ': '),
				columnData.map((col, i) => h('p', {key: i},  col.column_name + '(' + col.data_type + ')')),
				tableName === 'koru' && h('button', {
					onClick: () => joeFetch(
						'/api/newRow',
						{
							method: 'post',
							body: {table: tableName, items: [{column: 'material', value: 'mountain momma'}]}, headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
						}, // must include headers[Accept/contentType] on POST
						{success: console.log}
					)
				}, 'TAKE ME HOME')
			]))
		])
	])
)
