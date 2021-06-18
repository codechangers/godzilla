# Add Images to your Game

##### 5. In the `onJoin()` _function_ in `room.js` add functions so that on the backend, it loads the size of the map and your character.

```javascript
// File: room.js
// Copy
const x = Math.floor(Math.random() * GAME_WIDTH);
const y = Math.floor(Math.random() * GAME_HEIGHT);
g.createACharacter('players', client.sessionId,  { x, y, ...data });
// End Copy
onJoin(client, data) {
  /*[*/const x = Math.floor(Math.random() * GAME_WIDTH);
  const y = Math.floor(Math.random() * GAME_HEIGHT);
  g.createACharacter('players', client.sessionId,  { x, y, ...data });/*]*/
}
```