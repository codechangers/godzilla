# Add Images to your Game

##### 6. In the `onMessage()` _function_ in `room.js` add functions so that on the backend, it loads the size of the map and your character.

```javascript
// File: room.js
// Copy
const player = g.getACharacter('players', client.sessionId);
// End Copy
onMessage(client, data) {
  /*[*/const player = g.getACharacter('players', client.sessionId);/*]*/
}
```
