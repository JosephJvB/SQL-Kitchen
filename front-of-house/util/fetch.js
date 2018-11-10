/*
	 util function that wraps window.fetch
	 path: string - api endpoint to hit
	 options: object - keys: method, body, headers
		 - ?keys= mode:('cors'), cache:('default'), redirect:('follow'), referrer:('no-referrer'), credentials:('same origin')
		 TODO: fetchStatus actions to set UI in 4 states: idle, fetching, success, failure

		I wonder if Im using fetch wrong. or if there is a better way. Mine seems cumbersome as heck. But I guess if I create a fetch wrapper like this, then maybe it becomes easy?
		Lot of boilerplate tho.
*/

// body needs to be string, and headers needed to tell server how to read req.body(?)
const addHeadersToBodyAndStringify = (opts) => Object.assign(opts, {
	body: JSON.stringify(opts.body),
	headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
})

module.exports = (path, options, actions) => {
	// actions.setFetching() - tell ui-state that fetch is in progress
	// check params
	const validPath = path && typeof path === 'string'
	const validOptions = options && typeof options === 'object'
	const validActions = actions && typeof actions === 'object'
	if(!validPath || !validOptions || !validActions) { 
		return console.error('joeFetch expects params = (path:String, options:Object, actions:Object)')
	}
	if(!actions.success || typeof actions.success !== 'function') {
		return console.error('Param actions(type Object) MUST have a success property(type Function)')
	}
	
	// if u have body, add headers and stringify body 🤴
	return fetch(
		path,
		options.body ? addHeadersToBodyAndStringify(options) : options
	)
	// https://medium.com/@shahata/why-i-wont-be-using-fetch-api-in-my-apps-6900e6c6fe78
	.then((response) => response.json()
		.then((json) => {
			if(response.ok) {
				action.success(json)
			} else { 
				// here if error at joe DB
				console.error(json)
			}
		}))
	.catch(err => {
		// window.fetch only catches network errors.
		// eg: bad path, cors error. I think?
		console.error('joeFetch NETWORK error @ PATH', path, err)
	})
}
