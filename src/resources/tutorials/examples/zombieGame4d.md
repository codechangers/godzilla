# 1 Add Zombies
 (Step 4/7)

##### 4. In `game.js`, Add `getCharacters()` function in the `create()` function.

``` javascript
// File: code/client/src/game.js
// Copy
g.getCharacters('zombies');
// End Copy
g.getCharacters('players', (player) => {
	if (player.id === g.myId()) {
		g.cameraFollow(player.sprite);
	}
});
g.drawBackground( 'background',  3,  500,  2000 );/*[*/
g.getCharacters('zombies');/*]*/
```