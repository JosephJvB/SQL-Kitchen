const pgp = require('pg-promise')()

const DB = pgp({
	host: 'localhost',
	port: 5432,
	database: 'the_kitchen',
	user: 'postgres',
	password: 'postgres'
})

DB.one(`select 1 + 1 as answer`)
.then(res => helper({DB, type: 'TEST', result: res}))
.catch(err => helper({DB, type: 'TEST_ERROR', result: err}))

function helper ({DB, type, result}) {
	DB.$pool.end()
	return console.log(type + ':', result)
}