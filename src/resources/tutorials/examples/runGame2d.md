# Run Game - 2.D

## Add enemies to your game.

**(Step 4/6)** Add the enemy characters to your game.

### Add the enemy characters.

In the `game.js` file we need to put an `addCharacters` _function_ in the `init` _method_.

```javascript
// File: game.js
// Copy
g.addCharacters('enemies', 0.5);
// End Copy
init() {
	g.setup(this);
	g.setSize(GAME_WIDTH, GAME_HEIGHT);
	g.cameraBounds();
	g.addCharacters('players', 0.5);/*[*/
	g.addCharacters('enemies', 0.5);/*]*/
}
```

### Remove camera bounds to center game.

In the `game.js` file we need to remove the `cameraBounds` _function_ from the `init` _method_.

```javascript
// File: game.js
// Copy
init() {
	g.setup(this);
	g.setSize(GAME_WIDTH, GAME_HEIGHT);
	g.addCharacters('players', 0.5);
	g.addCharacters('enemies', 0.5);
}
// End Copy
init() {
	g.setup(this);
	g.setSize(GAME_WIDTH, GAME_HEIGHT);/*{*/
	g.cameraBounds();/*}*/
	g.addCharacters('players', 0.5);
	g.addCharacters('enemies', 0.5);
}
```
