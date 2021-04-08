# 4. Add Goals

Step (7.2/8) To create goals for your game

##### 7.2 In `room.js` Add the `createACharacter` function to add Goals for each player.

```javascript
// File: code/server/rooms/room.js
// Copy
g.createACharacter('goals', client.sessionId, { x, y });
// End Copy
onJoin(client, data) {
  const x = Math.floor(Math.random() * GAME_WIDTH);
  const y = Math.floor(Math.random() * GAME_HEIGHT);
  g.createACharacter('players', client.sessionId, { x, y, ...data });/*[*/
  g.createACharacter('goals', client.sessionId, { x, y });/*]*/
}
```
