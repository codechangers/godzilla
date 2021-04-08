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
/*[*/g.attachTo('players', client.sessionId, {  
	name: 'healthBar',
	x: -50,
	y: 40,
	width: 100,
	height: 10,
	type: 'bar',
	filled: 100
});/*]*/
```