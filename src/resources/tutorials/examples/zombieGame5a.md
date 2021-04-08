# 1 Add a Health Bar
 (Step 1/3)

##### 1. In `room.js` Create an `attachTo()` function inside the `onJoin()` function to add a health bar

``` javascript
// File: code/server/rooms/room.js
// Copy
g.attachTo('players', client.sessionId, {  
	name: 'healthBar',
	x: -50,
	y: 40,
	width: 100,
	height: 10,
	type: 'bar',
	filled: 100
});
// End Copy
onJoin(client, data) {
	const x = Math.floor(Math.random() * GAME_WIDTH);
	const y = Math.floor(Math.random() * GAME_HEIGHT);
	g.createACharacter('players', client.sessionId,  { x:  270, y:  1990, safe:  false, speed:  5, spriteName:  "players"  });/*[*/
	g.attachTo('players', client.sessionId, {  
		name: 'healthBar',
		x: -50,
		y: 40,
		width: 100,
		height: 10,
		type: 'bar',
		filled: 100
	});/*]*/
}
```