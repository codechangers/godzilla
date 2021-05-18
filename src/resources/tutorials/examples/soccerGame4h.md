# Soccer Game - 4.H

## Add soccer goals.

**(Step 8/8)** Delete goals when players leave the game.

### Delete player's goals.

In `room.js` we need to add a new `deleteACharacter` _function_ to the `onLeave` _method_.

```javascript
// File: room.js
// Copy
g.deleteACharacter('goals', client.sessionId);
// End Copy
onLeave(client) {
  g.deleteACharacter('players', client.sessionId);/*[*/
  g.deleteACharacter('goals', client.sessionId);/*]*/
}
```
