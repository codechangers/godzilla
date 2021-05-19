# Soccer Game - 9.D

## Allow players to place blocks in the game.

**(Step 4/7)** Send a place block action to the server on click.

### Click places a block.

In `game.js` we need to add a `sendAction` _function_ to the `click` _method_. We can only send _actions_ while we are connected to the server. So we need to make sure we are connected before the messages are sent using an _if statement_.

```javascript
// File: game.js
// Copy
if (g.canSend()) {
  g.sendAction('placeBlock', { x, y });
}
// End Copy
click(x, y) {
  /*[*/if (g.canSend()) {
    g.sendAction('placeBlock', { x, y });
  }/*]*/
}
```
