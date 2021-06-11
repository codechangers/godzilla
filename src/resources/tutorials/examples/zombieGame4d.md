# Zombie Game - 4.D

## Add shooting to the game.

**(Step 4/10)** Get the bullets state from the server.

### Get bullets from the server.

In `game.js`, we need to add another `getCharacter` _function_ to the `create` _method_. This will get the bullets state from the server.

``` javascript
// File: game.js
// Copy
g.getCharacters('bullets');
// End Copy
create() {
	g.setupKeys(keys);
	g.useLoginScreen((name) => g.connect({ name }));
	g.useStore('The Store', []);
	g.drawBackground('background');
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
	g.getCharacters('zombies');/*[*/
	g.getCharacters('bullets');/*]*/
}
```
