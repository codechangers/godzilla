# 1 Add Zombies
 (Step 3/7)

##### 3. In `game.js`, Add `addCharacters()` in the `Init()` function to add zombies.

``` javascript
// File: code/client/src/game.js
// Copy
g.addCharacters('zombies', 0.5);
// End Copy
init() {
	g.setup(this);
	g.setSize(GAME_WIDTH, GAME_HEIGHT);
	g.addCharacters('players', 0.5);/*[*/
	g.addCharacters('zombies', 0.5);/*]*/
}

```