# Soccer Game - 5.B

## Add soccer balls.

**(Step 2/6)** Add the soccer ball characters.

### Add soccer balls.

In `game.js` we need to add an `addCharacters` _function_ for the soccer balls to the `init` _method_.

```javascript
// File: game.js
// Copy
g.addCharacters('soccerBalls', 0.2);
// End Copy
init() {
  g.setup(this);
  g.setSize(GAME_WIDTH, GAME_HEIGHT);
  g.cameraBounds();
  g.addCharacters('players', 0.5);
  g.addCharacters('goals', 0.6);/*[*/
  g.addCharacters('soccerBalls', 0.2);/*]*/
}
```
