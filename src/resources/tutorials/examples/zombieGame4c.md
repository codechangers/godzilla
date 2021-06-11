# Zombie Game - 4.C

## Add shooting to the game.

**(Step 3/10)** Add bullet characters to the game.

### Add bullet characters.

In `game.js`, we need to add another `addCharacters` _function_ to the `init` _method_. This will add the bullet characters to our game.

``` javascript
// File: game.js
// Copy
g.addCharacters('bullets', 0.5);
// End Copy
init() {
	g.setup(this);
	g.setSize(GAME_WIDTH, GAME_HEIGHT);
	g.addCharacters('players', 0.5);
	g.addCharacters('zombies', 0.5);/*[*/
	g.addCharacters('bullets', 0.5);/*]*/
}
```
