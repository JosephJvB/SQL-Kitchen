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

// makeTable({table: 'limber_desk', columns: ['"id" integer', '"version" decimal', '"coffee_holder" boolean']})	

function makeTable({table, columns}) {
// TODO: factor these string creation for-loops out into utility functions. Not urgent
	let sqlColumns = ''
	for (let i = 0; i < columns.length; i++) {
		let sqlColumn = columns[i]
		sqlColumns += i + 1 < columns.length ? `${sqlColumn},` : sqlColumn
	}
	DB.one(`create table "${table}" (${sqlColumns})`)
		.then(res => helper({DB, type: 'CREATE_TABLE', result: res}))
		.catch(err => helper({DB, type: 'CREATE_TABLE ERROR', result: err}))
}

function insert({table, items}) {
	let sqlColumns = ''
	let sqlValues = ''
	for (let i = 0; i < items.length; i++) {
		const {column, value} = items[i]
		sqlColumns += i + 1 < items.length ? `${column},` : column
		sqlValues += i + 1 < items.length ? `${value},` : value
	}
	DB.one(`insert into ${table} (${sqlColumns}) values (${sqlValues})`)
		.then(res => helper({DB, type: 'INSERT', result: res}))
		.catch(err => helper({DB, type: 'INSERT_ERROR', result: err}))
}

// used in .then&.catch after promise resolves
// I guess this gets subbed out when I need data to go back to the front end
function helper ({DB, type, result}) {
	DB.$pool.end()
	return console.log(type + ':', result)
}
