# SELF-RETROSPECTIVES:

Haven't run this from the start of this project. But I'm going to try it out and see if I think it is useful. I guess I'm going to go away from the typical "what went well, what didn't go well, what can be improved for next time". This is mainly a document of the problems I faced and how they got resolved.

### 11AUG. TASK: Server routing. Blocks: 3

- Parceljs middleware
```
When I was trying to set up routes in my express server I wasn't able to to log to the console at a GET route to '/'.
So naturally any attempts to respond from these routes was no good.
I thought maybe Parceljs was pruning my server-side logs (lol, that would be so cruel).

But I think what it was is that I was registering the Parcel.bundler middleware before the route.
And I think the parcel middleware has to be registered last because it seems to block any following middleware...My assumption anyway.
```
*SOLVED BY:* Registering the app.get() route before any other middleware.

- Response.send()
```
This one hurt because it has tripped me up before.
res.body MUST be a JSON object. You cannot res.send a string...
I remember posting that to the Miromiro slack not long after bootcamp. Ouch.
```
*SOLVED BY:* I was reading another stack overflow question that was trying to JSON.parse() a string. So the answer was like: 'you should send an object'. That got the gears turning and I was like Ah fuck I can't believe I've done this

proof: @ `https://github.com/visionmedia/superagent/issues/270`: "body is not for plain text, its for objects parsed from content-types like application/json, url encoded and so on."

- Window.fetch api
```
I didn't read the instruction manual for window.fetch().
I kept seeing my responseBody as a readable stream.
And for a while I thought this was some problem with my server bodyParsing(lol).
```
*SOLVED BY:* I then started to suspect that maybe I should try another request API like superagent. But I first googled 'res.body as readable stream' and got told that actually when fetch returns a response, the first thing you must to is parse it. I guess superagent does this for you.

