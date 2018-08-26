/*
	 util function that wraps window.fetch
	 path: string - api endpoint to hit
	 options: object - keys: method, body, headers
		 - ?keys= mode:('cors'), cache:('default'), redirect:('follow'), referrer:('no-referrer'), credentials:('same origin')

		TODO: fetchStatus actions to set UI in 4 states: idle, fetching, success, failure
*/

// body needs to be string, and headers needed to tell server how to read req.body(?)
const addHeadersToBodyAndStringify = (opts) => Object.assign(opts, {
	body: JSON.stringify(opts.body),
	headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
})

module.exports = (path, options, actions) => {
	// actions.setFetching() - tell ui-state that fetch is in progress
	// if u have body, add headers and stringify body 🤴
	return fetch(
		path,
		options.body ? addHeadersToBodyAndStringify(options) : options
	)
	.then(res => res.json())
	// .then(console.log)
	.then(actions.success) // tell ui-state that fetch success..
	.catch(err => {
		// actions.setFetchError() - tell ui-state that fetch failed
		console.error('ERROR AT PATH', path, '\n', err)
	})
}
