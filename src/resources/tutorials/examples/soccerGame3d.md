# Soccer Game - 3.D

## Add more characters.

**(Step 4/5)** Add a player selection screen to your game.

### Add player select screen.

In `game.js` we need to add a `usePlayerSelectScreen` _function_ to our `create` _method_.

```javascript
// File: game.js
// Copy
g.usePlayerSelectScreen({
  blobbert: 'circle1.png',
  grunch: 'circle2.png',
  neon: 'circle3.png',
  nimbo: 'circle4.png',
  tangles: 'circle5.png'
});
// End Copy
create() {
	g.setupKeys(keys);
	g.useLoginScreen((name) => g.connect({ name }));/*[*/

	g.usePlayerSelectScreen({
		blobbert: 'circle1.png',
		grunch: 'circle2.png',
		neon: 'circle3.png',
		nimbo: 'circle4.png',
		tangles: 'circle5.png'
	});
/*]*/
	g.useStore('The Store', []);
	g.drawBackground('background', 0.8);
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
}
```
