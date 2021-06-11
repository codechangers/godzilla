# Zombie Game - 7.A

## Customize the how to play screen.

**(Step 1/1)** Customize the how to play screen.

### Customize the how to play screen.

In `game.js`, we need to add a `useHowToScreen` _function_ inside the `create` _method_.

The how to play screen has three different options:

1. `Title`: You can set this to whatever you want!
2. `Controls`: Here you should list what controls are in your game.
3. `Credits`: Here you can put your team members names and what you did!

``` javascript
// File: game.js
// Copy
g.useHowToScreen('How to play', {
			'WASD': 'To move your character',
			'Move Mouse': 'To aim at the zombies',
			'Click Mouse': 'To shoot at the zombies',
		}, {
			'Blobbert': 'Planning/Coding/Fixing',
			'Grunch': 'Coding/Testing/Fixing',
			'Nimbo': 'Planning/Designing/Testing',
		});
// End Copy
create() {
	g.setupKeys(keys);
	g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Survivor Name', 'Start!');/*[*/
	g.useHowToScreen('How to play', {
		'WASD': 'To move your character',
		'Move Mouse': 'To aim at the zombies',
		'Click Mouse': 'To shoot at the zombies',
	}, {
		'Blobbert': 'Planning/Coding/Fixing',
		'Grunch': 'Coding/Testing/Fixing',
		'Nimbo': 'Planning/Designing/Testing',
	});/*]*/
	g.useStore('The Store', []);
	g.drawBackground('background');
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
	g.getCharacters('zombies');
	g.getCharacters('bullets');
}
```

Change the names and the roles in the code you just copied to your team member's names and also what job you did in the project.

When you write yours, you will need to keep adding to your list of controls, and your contributors until you have added everything needed for your game.
