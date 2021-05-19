# Soccer Game - 4.G

## Add soccer goals.

**(Step 7/8)** Create a new goal for each player that joins the game.

### Create goals for players.

In `room.js` we need to add a new `createACharacter` _function_ to the `onJoin` _method_.

```javascript
// File: room.js
// Copy
g.createACharacter('goals', client.sessionId, { x, y });
// End Copy
onJoin(client, data) {
  const x = Math.floor(Math.random() * GAME_WIDTH);
  const y = Math.floor(Math.random() * GAME_HEIGHT);
  g.createACharacter('players', client.sessionId,  { x, y, ...data });/*[*/
  g.createACharacter('goals', client.sessionId, { x, y });/*]*/
}
```
