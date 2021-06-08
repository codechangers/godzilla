# Zombie Game - 2.F

## Add zombies into your game.

**(Step 6/7)** Spawn zombies in waves throughout the game.

### Create zombies in waves.

In `room.js`, we need to use the `setInterval` _function_ along with the `createACharacter` _function_ inside the `onInit` _method_.
This will spawn zombies into our game in waves.

``` javascript
// File: room.js
// Copy
const waveTimer = 2500;
		setInterval(() => g.createACharacter('zombies',
			g.nextCharacterId('zombies'), {
				x: Math.floor((Math.random() * GAME_WIDTH) + 1),
				y: Math.floor((Math.random() * GAME_HEIGHT) + 1)
			}), waveTimer);
// End Copy
onInit() {
	g.setup(this);
	g.setBounds(GAME_WIDTH, GAME_HEIGHT);
	g.setupCharacters('players');
	g.setupCharacters('zombies');/*[*/

	const waveTimer = 2500;
	setInterval(() => g.createACharacter('zombies',
		g.nextCharacterId('zombies'), {
			x: Math.floor((Math.random() * GAME_WIDTH) + 1),
			y: Math.floor((Math.random() * GAME_HEIGHT) + 1)
		}), waveTimer);/*]*/
}
```

> **The `waveTimer` will determine how long each wave of zombies lasts. The example is `2500` which would make the waves last 2.5 seconds.**
