const pgp = require('pg-promise')()

const DB = pgp({
	host: 'localhost',
	port: 5432,
	database: 'the_kitchen',
	user: 'postgres',
	password: 'postgres'
})

/*
	DB.one(`select 1 + 1 as answer`)
	.then(res => helper({DB, type: 'TEST', result: res}))
	.catch(err => helper({DB, type: 'TEST_ERROR', result: err}))
*/

// tableMaker({table: "koru", columns: [{name: "id", type: 'integer generated by default as identity primary key'}, {name: "material", type: 'char(255)'}]})	
// inserter({table: "limber_desk", items: [{column: "version", value: 6.9}, {column: "coffee_holder", value: true}]})
// tableBreaker("limber_desk")
// deleter({table: "limber_desk", condition: '"version" = 6.9'})
// updater({table: "limber_desk", items: [{column: "version", value: 4.20}, {column: "id", value: 2}], condition: '"version" = 6.9'})

function tableMaker({table, columns}) {
	// columns = [{name, type}, {name, type}, ...]
	const sqlColumns = columns.reduce((str, column, i) => `${str}${column.name} ${column.type}${i + 1 < columns.length ? ',' : ''}`, '')
	DB.one(`create table ${table} (${sqlColumns})`)
		.then(res => helper({DB, type: 'CREATE_TABLE', result: res}))
		.catch(err => helper({DB, type: 'CREATE_TABLE ERROR', result: err}))
}

function tableBreaker(table) {
	DB.one(`drop table "${table}"`)
		.then(res => helper({DB, type: 'DROP_TABLE', result: res}))
		.catch(err => helper({DB, type: 'DROP_TABLE ERROR', result: err}))
}

function inserter({table, items}) {
	//items = [{column, value}, {column, value}, ...]
	const sqlColumns = items.reduce((str, item, i) => `${str}${item.column}${i + 1 < items.length ? ',' : ''}`, '')
	const sqlValues = items.reduce((str, item, i) => `${str}${item.value}${i + 1 < items.length ? ',' : ''}`, '')
	DB.one(`insert into ${table} (${sqlColumns}) values (${sqlValues}) returning *`)
		.then(res => helper({DB, type: 'INSERT', result: res}))
		.catch(err => helper({DB, type: 'INSERT_ERROR', result: err}))
}

function deleter({table, condition}) {
	DB.one(`delete from ${table} where ${condition} returning *`)
		.then(res => helper({DB, type: 'DELETE', result: res}))
		.catch(err => helper({DB, type: 'DELETE_ERROR', result: err}))
}

function updater({table, items, condition}) {
	// items = [{column, value}, {column, value}, ...]
	const sqlItems = items.reduce((str, item, i) => `${str}${item.column} = ${item.value}${i + 1 < items.length ? ',' : ''}`, '')
	DB.one(`update ${table} set ${sqlItems} where ${condition} returning *`)
		.then(res => helper({DB, type: 'UPDATE', result: res}))
		.catch(err => helper({DB, type: 'UPDATE_ERROR', result: err}))
}

// used in .then&.catch after promise resolves
// I guess this gets subbed out when I need data to go back to the front end
function helper ({DB, type, result}) {
	DB.$pool.end()
	return console.log(type + ':', result)
}
