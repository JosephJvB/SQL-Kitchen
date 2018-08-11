const parcelBundler = require('parcel-bundler')
const express = require('express')

const api = express()
const bundler = new parcelBundler('index.html', {/* can pass options here */})

api.use(express.json())
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
