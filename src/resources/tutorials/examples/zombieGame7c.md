# 5. Setup Login Screen
 (Step 3/4)

##### 3. In `room.js`, Delete the existing `createACharacter()` function inside the `onJoin` function and replace it with a new one!

``` javascript
// File: code/server/rooms/room.js
// Copy
g.createACharacter('players', client.sessionId, { x: 200, y: 200, score: 0, ...data });
// End Copy
click: () => {
	const index = g.nextCharacterId('bullets');
	/*{*/g.createACharacter('bullets', index, { x: player.x, y: player.y }); /*}[*/g.createACharacter('players', client.sessionId, { x: 200, y: 200, score: 0, ...data });/*]*/
```

