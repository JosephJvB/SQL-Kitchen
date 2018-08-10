const parcelBundler = require('parcel-bundler')
const api = require('express')()

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

const bundler = new parcelBundler('index.html', bundlerOptions)

api.use(bundler.middleware())

api.listen(8080, () => console.log('Papa can you hear me...'))