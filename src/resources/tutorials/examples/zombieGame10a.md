# 8. Create a Scoreboard
 (Step 1/3)

##### 1. In `game.js` delete the old `getCharacters()` code and add the new code in the `create()` function.

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
		id === 'filled' &&
		value <= 1 &&
		player.id === g.myId()
	) {
		location.reload();
	}
});
// End Copy
create() {
	g.drawBackground('background');
	g.setupKeys(keys);
	g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Username', 'Start!');
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	}/*{*/);/*}[*/,
	() => {},
	(id, attr, value) => {
		if (
			attr === 'filled' &&
			id === 'filled' &&
			value <= 1 &&
			player.id === g.myId()
		) {
			location.reload();
		}
	});/*]*/
	g.getCharacters('zombies');
	g.getCharacters('bullets');
	g.useHowToScreen('How to play', {
		'Move Mouse': 'To aim at the zombies',
		'Click Mouse': 'To shoot at the zombies'
	}, {
		'Blobbert': 'Planning/Coding/Fixing',
		'Grunch': 'Coding/Testing/Fixing',
		'Nimbo': 'Planning/Designing/Testing',
	});
}
```
