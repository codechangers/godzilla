# Soccer Game - 9.E

## Allow players to place blocks in the game.

**(Step 5/7)** Setup the block characters on the server.

### Setup blocks.

In `room.js` we need to add another `setupCharacters` _function_ to the `onInit` _method_.

```javascript
// File: room.js
// Copy
g.setupCharacters('blocks');
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players', 'circle');
  g.setupCharacters('goals', 'circle');
  g.setupCharacters('soccerBalls', 'circle');/*[*/
  g.setupCharacters('blocks');/*]*/
}
```
