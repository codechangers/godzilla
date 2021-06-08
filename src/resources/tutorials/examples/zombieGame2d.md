# 2. Add Zombies
(Step 4/7)

##### 4. In `game.js`, Add `getCharacters()` function in the `create()` function.

``` javascript
// File: code/client/src/game.js
// Copy
g.getCharacters('zombies');
// End Copy
g.drawBackground('background');
g.setupKeys(keys);
g.useLoginScreen((name) => g.connect({ name }));
g.getCharacters('players', (player) => {
	if (player.id === g.myId()) {
		g.cameraFollow(player.sprite);
	}
});/*[*/
g.getCharacters('zombies');/*]*/
```