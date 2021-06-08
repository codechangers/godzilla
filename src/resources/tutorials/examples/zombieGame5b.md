# 5. Setup Login Screen
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
onJoin(client, data) {
	const x = Math.floor(Math.random() * GAME_WIDTH);
	const y = Math.floor(Math.random() * GAME_HEIGHT);
	g.createACharacter('players', client.sessionId, { x, y, ...data });
	g.attachTo('players', client.sessionId, {
		name: 'healthBar',
		x: -50,
		y: 40,
		width: 100,
		height: 10,
		type: 'bar',
		filled: 100
	});/*[*/
	g.attachTo('players', client.sessionId, {  
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});/*]*/
}
```
> **Make sure to add the NameTag after the healthBar code at the bottom of the `onJoin()` function.**
