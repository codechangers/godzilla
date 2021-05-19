# Soccer Game - 9.C

## Allow players to place blocks in the game.

**(Step 3/7)** Listen to the blocks state on the server.

### Get the blocks from the server.

In `game.js` we need to add another `getCharacters` _function_ to the `create` _method_.

```javascript
// File: game.js
// Copy
g.getCharacters('blocks');
// End Copy
  g.getCharacters('players', (player) => {
    player.sprite.depth = 5;
    if (player.id === g.myId()) {
      g.cameraFollow(player.sprite);
    }
  },
  () => {},
  (id, attr, value) => {
    if (id === g.myId() && attr === 'lives' && value <= 0) {
      location.reload();
    }
  });
  g.getCharacters('goals');
  g.getCharacters('soccerBalls');/*[*/
  g.getCharacters('blocks');/*]*/
}
```
