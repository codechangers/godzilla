# Zombie Game - 8.A

## Add a game over condition.

**(Step 1/2)** Make it so that players get a game over when they run out of health!

### Add a game over!

In `game.js`, we need to update the `getCharacters` _function_ for `players` in the `create` _method_.

``` javascript
// File: game.js
// Copy
g.getCharacters('players', (player) => {
			if (player.id === g.myId()) {
				g.cameraFollow(player.sprite);
			}
		},
		() => {},
		(id, attr, value) => {
			if (
				attr === 'filled' &&
				id === g.myId() &&
				value <= 1
			) {
				location.reload();
			}
		});
// End Copy
create() {
	g.setupKeys(keys);
	g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Survivor Name', 'Start!');
	g.useHowToScreen('How to play', {
		'WASD': 'To move your character',
		'Move Mouse': 'To aim at the zombies',
		'Click Mouse': 'To shoot at the zombies',
	}, {
		'Blobbert': 'Planning/Coding/Fixing',
		'Grunch': 'Coding/Testing/Fixing',
		'Nimbo': 'Planning/Designing/Testing',
	});
	g.useStore('The Store', []);
	g.drawBackground('background');
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	}/*{*/);/*}[*/,
	() => {},
	(id, attr, value) => {
		if (
			attr === 'filled' &&
			id === g.myId() &&
			value <= 1
		) {
			location.reload();
		}
	});/*]*/
	g.getCharacters('zombies');
	g.getCharacters('bullets');
}
```
