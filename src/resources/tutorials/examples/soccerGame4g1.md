# 4. Add Goals

Step (7.1/8) To create goals for your game

##### 7.1 In `room.js` Update the `createACharacter` function to use our new login data.

```javascript
// File: code/server/rooms/room.js
// Copy
g.createACharacter('players', client.sessionId, { x, y, ...data });
// End Copy
onJoin(client, data) {
  const x = Math.floor(Math.random() * GAME_WIDTH);
  const y = Math.floor(Math.random() * GAME_HEIGHT);
  g.createACharacter('players', client.sessionId,  { x/*{*/:  270, y:  1990, safe:  false, speed:  5, spriteName:  "players" /*}[*/, y, ...data/*]*/ });
}
```
