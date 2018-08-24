/*
	 util function that wraps window.fetch
	 path: string - api endpoint to hit
	 options: object - keys: method, body, headers
		 - ?keys= mode:('cors'), cache:('default'), redirect:('follow'), referrer:('no-referrer'), credentials:('same origin')

		TODO: fetchStatus actions to set UI in 4 states: idle, fetching, success, failure
*/

module.exports = (path, options, actions) => {
	// actions.setFetching() - tell ui-state that fetch is in progress
	return fetch(
		path,
		// stringify req.body if it exists. My code my rules 🤴
		options.body ? Object.assign(options, {body: JSON.stringify(options.body)}) : options
	)
	.then(res => res.json())
	// .then(console.log)
	.then(actions.success) // tell ui-state that fetch success..
	.catch(err => {
		// actions.setFetchError() - tell ui-state that fetch failed
		console.log('ERROR AT PATH', path, '\n', err)
	})
}
