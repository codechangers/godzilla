# Zombie Game - 2.C

## Add zombies into your game.

**(Step 3/7)** Add the zombie characters into your game.

### Add the zombie characters.

In `game.js`, we need to add a new `addCharacters` _function_ to the `init` _method_.
This will add the zombie characters to our game.

``` javascript
// File: game.js
// Copy
g.addCharacters('zombies', 0.5);
// End Copy
init() {
	g.setup(this);
	g.setSize(GAME_WIDTH, GAME_HEIGHT);
	g.cameraBounds();
	g.addCharacters('players', 0.5);/*[*/
	g.addCharacters('zombies', 0.5);/*]*/
}
```
