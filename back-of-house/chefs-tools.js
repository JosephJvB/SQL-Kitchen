const pgp = require('pg-promise')()

// need to make this config accept different things for local vs heroku...
const PG_CONFIG = process.env.PORT // assume this is a way I can tell that it's heroku time
	? process.env.DATABASE_URL
	: {
		host: 'localhost',
		port: 5432,
		database: 'the_kitchen', // how do I get it so user can make more databases then connect to them? stretch
		user: 'postgres',
		password: 'postgres'
	}

const DB = pgp(PG_CONFIG)

/*
	So I'm not using the default postgres way of inserting variables into the query string:
		'select $1 from $2 where $3 = $4', ['*', 'limber_desk', 'id', 2]
	I'm doing my own home-brew string concatenation. That is probably bad in the long run. Clever is not smart
	...yoloswaggins
*/

// tableMaker({table: "koru", columns: [{name: "id", type: 'integer generated by default as identity primary key'}, {name: "material", type: 'char(255)'}]})	
// inserter({table: "limber_desk", items: [{column: "version", value: 6.9}, {column: "coffee_holder", value: true}]})
// tableBreaker("limber_desk")
// deleter({table: "limber_desk", condition: '"version" = 6.9'})
// updater({table: "limber_desk", items: [{column: "version", value: 4.20}, {column: "id", value: 2}], condition: '"version" = 6.9'})
// reader({table: "information_schema.tables", columns: ['table_name'], condition: `table_schema = 'public'`})
//reader({table: 'information_schema.columns', columns: ['column_name, data_type'], condition: `"table_name"='nonagon'`})

function tableMaker({table, columns}) {
	// columns = [{name, type}, {name, type}, ...]
	const sqlColumns = columns.reduce((str, column, i) => `${str}${column.name} ${column.type}${i + 1 < columns.length ? ',' : ''}`, '')
	const idColumn = 'id integer generated by default as identity primary key'
	return DB.none(`create table ${table} (${idColumn}, ${sqlColumns})`)
		.catch(console.error)
	}
	
	function tableBreaker(table) {
		return DB.none(`drop table "${table}"`)
		.catch(console.error)
	}
	
	function inserter({table, items}) {
		//items = [{column, value}, {column, value}, ...]
		const sqlColumns = items.reduce((str, item, i) => `${str}${item.column}${i + 1 < items.length ? ',' : ''}`, '')
		const sqlValues = items.reduce((str, item, i) => `${str}'${item.value}'${i + 1 < items.length ? ',' : ''}`, '')
		const SQL = `insert into ${table} (${sqlColumns}) values (${sqlValues}) returning *`
		return DB.many(SQL)
		.then(RES => ({RES, SQL}))
		.catch(console.error)
	}
	
	function deleter({table, condition}) {
		const SQL = `delete from ${table} where ${condition} returning *`
		return DB.many(SQL)
		.then(RES => ({RES, SQL}))
		.catch(console.error)
	}
	
	function updater({table, items, condition}) {
		// items = [{column, value}, {column, value}, ...]
		const sqlItems = items.reduce((str, item, i) => `${str}${item.column} = ${item.value}${i + 1 < items.length ? ',' : ''}`, '')
		return DB.many(`update ${table} set ${sqlItems} where ${condition} returning *`)
		.catch(console.error)
	}
	
	function reader({table, columns, condition}) {
		// columns = ['column_name', 'column_name', ...]
		const sqlColumns = columns.reduce((str, column, i) => `${str}${column}${i + 1 < columns.length ? ',' : ''}`, '')
		const SQL = `select ${sqlColumns} from ${table}${condition ? ' where ' + condition : ''}`
		return DB.any(SQL)
		.then(RES => ({RES, SQL}))
		.catch(console.error)
}

// DB.$pool.end() closes the DB connection - this needs to be called after every query (I think)
function helper ({DB, type, result}) {
	DB.$pool.end()
	return console.error(type + ':', result)
}

module.exports = {
	tableMaker,
	tableBreaker,
	inserter,
	deleter,
	updater,
	reader,
}