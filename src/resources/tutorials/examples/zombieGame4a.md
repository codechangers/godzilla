# Run Game - 4.A

## Add shooting to the game.

**(Step 1/9)** Add bullet characters to the game.

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
