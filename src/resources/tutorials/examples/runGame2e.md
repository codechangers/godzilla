# Run Game - 2.E

## Add enemies to your game.

**(Step 5/6)** Listen to enemy state changes from the server.

### Get enemies from the server.

In `game.js`, Add a `getCharacters` _function_ in the `create` _method_.

```javascript
// File: game.js
// Copy
g.getCharacters('enemies');
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
	g.getCharacters('enemies');/*]*/
}
```
