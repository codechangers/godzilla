# Soccer Game - 3.E

## Add more characters.

**(Step 5/5)** Send the character selection to the server.

### Save our character choice.

In `game.js` we need to change the `useLoginScreen` _function_ in our `create` _method_.

```javascript
// File: game.js
// Copy
g.useLoginScreen((name, spriteName) => g.connect({ name, spriteName }));
// End Copy
create() {
	g.setupKeys(keys);
	g.useLoginScreen((name/*[*/, spriteName/*]*/) => g.connect({ name/*[*/, spriteName/*]*/ }));

	g.usePlayerSelectScreen({
		blobbert: 'circle1.png',
		grunch: 'circle2.png',
		neon: 'circle3.png',
		nimbo: 'circle4.png',
		tangles: 'circle5.png'
	});

	g.useStore('The Store', []);
	g.drawBackground('background', 0.8);
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
}
```
