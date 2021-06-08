# 4. Setup Bullets
 (Step 1/10)

##### 1. in `game.js`, Create bullets using the `addCharacters()` function inside the `init()` function.  

``` javascript
// File: code/client/src/game.js
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
