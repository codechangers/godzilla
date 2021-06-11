# Zombie Game - 4.E

## Add shooting to the game.

**(Step 5/10)** Setup the bullet characters on the server.

### Setup the bullet characters.

In `room.js`, we need to add another `setupCharacters` _function_ to the `onInit` _method_. This will setup our bullet characters.

``` javascript
// File: room.js
// Copy
g.setupCharacters('bullets');
// End Copy
onInit() {
	g.setup(this);
	g.setBounds(GAME_WIDTH, GAME_HEIGHT);
	g.setupCharacters('players');
	g.setupCharacters('zombies');/*[*/
	g.setupCharacters('bullets');/*]*/

	const waveTimer = 2500;
	setInterval(() => g.createACharacter('zombies',
		g.nextCharacterId('zombies'), {
			x: Math.floor((Math.random() * GAME_WIDTH) + 1),
			y: Math.floor((Math.random() * GAME_HEIGHT) + 1)
		}), waveTimer);
}
```
