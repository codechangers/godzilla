# Add Images to your Game

##### 10. In the `onMessage()` _function_ in `room.js` add a varable to set the character's speed and set up the actions to move the character in the correct directions.

```javascript
// File: room.js
// Copy
const speed = 10;
const actions = {
  moveUp: () => g.move(player, 'y', -speed),
  moveDown: () => g.move(player, 'y', speed),
  moveLeft: () => g.move(player, 'x', -speed),
  moveRight: () => g.move(player, 'x', speed),
};
g.handleActions(actions, data);
// End Copy
onMessage(client, data) {
  const player = g.getACharacter('players', client.sessionId);/*[*/
  const speed = 10;
  const actions = {
    moveUp: () => g.move(player, 'y', -speed),
    moveDown: () => g.move(player, 'y', speed),
    moveLeft: () => g.move(player, 'x', -speed),
    moveRight: () => g.move(player, 'x', speed),
  };
  g.handleActions(actions, data);/*]*/
}
```