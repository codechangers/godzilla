# Soccer Game - 2.C

## Add a new background to your game.

**(Step 3/3)** Set the background scale.

### Set the background scale.

In `game.js` we need to change the `drawBackground` _function_ in the `create` _method_.

```javascript
// File: game.js
// Copy
g.drawBackground('background', 0.8);
// End Copy
create() {
	g.setupKeys(keys);
	g.useLoginScreen((name) => g.connect({ name }));
	g.useStore('The Store', []);
	/*[*/g.drawBackground('background', 0.8);/*]*/
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
}
```
