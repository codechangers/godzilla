# Set up Name Tags
subtitle: (Step 1/1) Set up name tags.

##### 1. Go into our `room.js` file and add an `attachTo` _function_  in our onJoin _function_ right after our `createACharacter` _function_.

```
// File: code/server/rooms/room.js
g.attachTo('players', client.sessionId,  {
	name:  'nameTag',
	x:  -50,
	y:  -60,
	type:  'text',
	text: data.name
});
```

You can change where the name tag is created by changing the x and y values.
