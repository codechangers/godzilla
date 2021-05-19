# Soccer Game - 9.A

## Allow players to place blocks in the game.

**(Step 1/7)** Add block characters to the game.

### Add block characters.

In `game.js` we need to add another `addCharacters` _function_ to the `init` _method_.

```javascript
// File: game.js
// Copy
g.addCharacters('blocks', 0.5);
// End Copy
init() {
	g.setup(this);
	g.setSize(GAME_WIDTH, GAME_HEIGHT);
	g.cameraBounds();
	g.addCharacters('players', 0.5);
	g.addCharacters('goals', 0.6);
	g.addCharacters('soccerBalls', 0.2);/*[*/
	g.addCharacters('blocks', 0.5);/*]*/
}
```
