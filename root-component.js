const h = require('react-hyperscript')
const { connect: connectRedux } = require('react-redux')

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
			onClick: () => fetchTest('/api/home', {method: 'get'}, setHomeData)
		}, 'FETCH TESTER'),
		h('div', {}, [
			homeData.map(({tableName, columnData}) => h('div', {
				key: tableName,
				style: { border: '2px dotted red' },
			}, [
				h('h1', {
					onClick: () => fetchTest(`/api/table/${tableName}`, {method: 'get'}, console.log)
				}, tableName + ': '),
				columnData.map((col, i) => h('p', {key: i},  col.column_name + '(' + col.data_type + ')')),
				tableName === 'koru' && h('button', {
					onClick: () => fetchTest('/api/newRow', {method: 'post', body: {table: tableName, items: [{column: 'material', value: 'mountain momma'}]}, headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}}, console.log)
				}, 'TAKE ME')
			]))
		])
	])
)

function fetchTest(url, options, handler) {
	return fetch(url, options.body ? Object.assign(options, {body: JSON.stringify(options.body)}) : options)
		.then(res => res.json())
		// .then(console.log)
		.then(handler) // set data in redux state
		.catch(console.log)
}