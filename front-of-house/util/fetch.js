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

	// error handling: prompt with helpful messages
	if(!path || !options || !actions) {
		return console.error('joeFetch expects params = (path:String, options:Object, actions:Object)')
	}
	if(!actions.success) {
		return console.error('Param actions(type Object) MUST have a success property(type Function)')
	}
	
	// if u have body, add headers and stringify body 🤴
	return fetch(
		path,
		options.body ? addHeadersToBodyAndStringify(options) : options
	)
	.then((response) => { // can catch error here with res.ok
		return response.json()
		.then((json) => {
			if(response.ok) {
				action.success(json)
			} else {
				// handle joeError from express API
				console.error(json)
			}
		})
	})
	.catch(err => {
		// window.fetch only catches network errors.
		// eg: bad path, cors error. I think?
		console.error('joeFetch NETWORK error @ PATH', path, err)
	})
}
