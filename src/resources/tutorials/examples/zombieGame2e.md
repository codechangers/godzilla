# Zombie Game - 2.E

## Add zombies into your game.

**(Step 5/7)** Subscribe to the zombie state from the server.

### Get the zombies from the server.

In `game.js`, we need to add a new `getCharacters` _function_ to the `create` _method_.
This will get the zombies state from the server!

``` javascript
// File: game.js
// Copy
g.getCharacters('zombies');
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
	});/*[*/
	g.getCharacters('zombies');/*]*/
}
```
