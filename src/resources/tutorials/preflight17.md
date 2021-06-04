# Setup Up Game Over

##### 13. In the `onLeave()` _function_ in `room.js` add a function so that when a player dies, it is deleted from the game.

```javascript
// File: room.js
// Copy
g.deleteACharacter('players', client.sessionId);
// End Copy
onLeave(client) {/*[*/
  g.deleteACharacter('players', client.sessionId);/*]*/
}
```
