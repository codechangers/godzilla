# 1 Setup Login Screen
 (Step 2/4)

##### 2. In `room.js`, add this code to the bottom of your `onJoin()` function to customize the login screen.

``` javascript
// File: code/server/rooms/room.js
// Copy
g.attachTo('players', client.sessionId, {  
	name: 'nameTag',
	x: -50,
	y: -60,
	type: 'text',
	text: data.name
});
// End Copy
/*[*/g.attachTo('players', client.sessionId, {  
	name: 'nameTag',
	x: -50,
	y: -60,
	type: 'text',
	text: data.name
});/*]*/
```
