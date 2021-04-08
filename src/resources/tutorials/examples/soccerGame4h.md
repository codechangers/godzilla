# 4. Add Goals

Step (8/8) To create goals for your game

##### 8. in `room.js`, Add `deleteACharacter` function so that players are removed when the leave the game.

```javascript
// File: code/server/rooms/room.js
// Copy
g.deleteACharacter('goals', client.sessionId);
// End Copy
onLeave(client) {
  g.deleteACharacter('players', client.sessionId);/*[*/
  g.deleteACharacter('goals', client.sessionId);/*]*/
}
```
