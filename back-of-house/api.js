const parcelBundler = require('parcel-bundler'),
			bundler = new parcelBundler('back-of-house/index.html', {/* can pass options here */}),
			express = require('express'),
			api = express()

const DB = require('./chefs-tools')

api.use(express.json())

// ALWAYS res.send() an Object.
// joeFetch always expects JSON response
// can res.status(400+).send({message, data}) to send custom error responses

/* more SQL > JS way of getting table column info
		- doesnt get table_name tho.
		- i dont know how to select from two tables at once, I assume that's a join.

		currentway: 1 query -> then n queries. One for each table
		this refactor: 1 query -> then 1 nested query.

		dont know what that means for performance. Keeping this as a note. but no refactor yet

api.get('/', (req, res) => DB.reader({
	table: "information_schema.columns",
	columns: ['column_name', 'data_type'],
	condition: `table_name in (select table_name from information_schema.tables where table_schema = 'public')`	
}).then((resss) => console.log(resss)))
*/

// GET metaData for all tables in DB
api.get('/api/home', (req, res) => DB.reader({ // get all table names
		table: "information_schema.tables",
		columns: ['table_name'],
		condition: `table_schema = 'public'`
	}) // <--end db request
	.then(({RES: tableNames, SQL: SQL_ONE}) => Promise.all(
		tableNames.map((table) => DB.reader({ // get columns for each tableName returned
			table: "information_schema.columns",
			columns: ['column_name', 'data_type'],
			condition: `table_name = '${table.table_name}'`
		})) // <--end mapped array of promises..
	) // <--end p.all
	//{res: tableColumns, SQL}
	.then((allTablesData) => res.send({
		// send {data: [{tableName: columnData}, {}, ...]}
		RES:	tableNames.reduce((acc, table, i) => [].concat(acc, [{ tableName: table.table_name, columnData: allTablesData[i].RES }]), []),
		SQL: `${SQL_ONE}\n-----\n${allTablesData[allTablesData.length - 1].SQL}`, // just grab the last SQL string 🤷‍♀️
		status: 200
	})))
	.catch(err => res.sendStatus(400))
)

// GET row data for a single table
api.get('/api/table/:tableName', (req, res) => DB.reader({
		table: req.params.tableName,
		columns: ['*']
	})
	.then(({RES, SQL}) => res.send({RES, SQL, status: 200}))
	.catch(err => res.sendStatus(400))
)

// CREATE a new row in a table
// question to ask: put vs post? I dont have a good answer right now..yikes, that's a weakness
api.post('/api/newRow', ({body: {table, items}}, res) => DB.inserter({table, items})
	.then(({RES, SQL}) => res.send({RES, SQL, status: 200}))
	.catch(err => res.sendStatus(400))
)

// DELETE a row in a table
// do I want a 'soft-delete'? eg: update with 'deleted' flag means read requests will ignore the resource
api.delete('/api/deleteRow/:table/:id', ({params:  {table, id}}, res) => DB.deleter({
		table,
		condition: `id = ${id}`
	})
	.then(({RES, SQL}) => res.send({RES, SQL, status: 200}))
	.catch(err => res.sendStatus(400))
)

api.post('/api/customQuery', ({body: {query}}, res) => DB.customQuerier(query)
	.then(({RES, SQL}) => {
		res.send({RES, SQL, status: 200})
	})
	.catch(err => {
		if(err.code === '42601') {
			res.status(400).send({msg: 'SQL syntax error'})
		} else {
			res.sendStatus(400) // send generic error message
		}
	})
)

// I think this has to be connected last... It's not calling next SMH my head
api.use(bundler.middleware())

api.listen(process.env.PORT || 8080, () => console.log('Papa can you hear me...'))

/* did you know you cant go:
	app.get('/path', (req, res) => asyncDBfunction().then(res.send))
	https://stackoverflow.com/questions/41801723/express-js-cannot-read-property-req-of-undefined
	no big deal, but interesting error message
*/


// you can pass options to parcelBundler - in theory
const bundlerOptions = {
/* tryin to add these options broke something. removing them fixed something. I am a simple man
	outDir: './dist',
	outFile: 'index.html',
	publicUrl: './',
	watch: true,
	target: 'browser',
	//https: true SET TO FALSE BY DEFAULT - I find it funny to create insecure systems I guess
	logLevel: 3,
*/
}
