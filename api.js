const parcelBundler = require('parcel-bundler')
const bundler = new parcelBundler('index.html', {/* can pass options here */})

const express = require('express')
const api = express()

const DB = require('./chefs-tools')

api.use(express.json())
// I HAVE TO RETURN DB.reader OR IT BREAKS?? so I'm not calling next() but also it's not breaking...wtf
api.get('/api', (req, res) => DB.reader({ // get all table names
		table: "information_schema.tables",
		columns: ['table_name'],
		condition: `table_schema = 'public'`
	}) // <--end db request
	.then((tableNames) => Promise.all( // forEach returned table-item
		tableNames.map((table) => DB.reader({ // find that tables' column information
			table: "information_schema.columns",
			columns: ['column_name', 'data_type'],
			condition: `table_name = '${table.table_name}'`
		})) // <--end mapped array of promises..
	) // <--end p.all
	.then((tableColumns) => res.send({
		// send {data: [{tableName: columnData}, {}, ...]}
		data:	tableNames.reduce((acc, table, i) => [].concat(acc, [{ tableName: table.table_name, tableColumns: tableColumns[i] }]), [])
	}))) 
)
// I think this has to be connected last... It's not calling next SMH my head
api.use(bundler.middleware())

api.listen(8080, () => console.log('Papa can you hear me...'))

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
