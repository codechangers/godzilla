# Run Game - 4.F

## Add shooting to the game.

**(Step 6/9)** Create a bullet and launch it when the click action is called.

### Create bullets in the click action.

In `room.js`, we need to add a `createACharacter` _function_ inside our `click` _action_ from the previous step, inside the `onMessage` _method_.

``` javascript
// File: room.js
// Copy
const bulletSpeed = 500;
				const bulletDuration = 2000;
				const index = g.nextCharacterId('bullets');
				g.createACharacter('bullets', index, { x: player.x, y: player.y, playerId: player.id });
				let newCharacter = g.getACharacter('bullets', index);
				g.playAnimation(newCharacter, 'x',
					g.getXTowards(newCharacter, data.x, data.y) * bulletSpeed, bulletDuration);
				g.playAnimation(newCharacter, 'y',
					g.getYTowards(newCharacter, data.x, data.y) * bulletSpeed, bulletDuration);
				setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), bulletDuration);
// End Copy
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	const speed = 10;
	const actions = {
		moveUp: () => g.move(player, 'y', -speed),
		moveDown: () => g.move(player, 'y', speed),
		moveLeft: () => g.move(player, 'x', -speed),
		moveRight: () => g.move(player, 'x', speed),
		click: () => {/*{*/},/*}[*/
			const bulletSpeed = 500;
			const bulletDuration = 2000;
			const index = g.nextCharacterId('bullets');
			g.createACharacter('bullets', index, { x: player.x, y: player.y, playerId: player.id });
			let newCharacter = g.getACharacter('bullets', index);
			g.playAnimation(newCharacter, 'x',
				g.getXTowards(newCharacter, data.x, data.y) * bulletSpeed, bulletDuration);
			g.playAnimation(newCharacter, 'y',
				g.getYTowards(newCharacter, data.x, data.y) * bulletSpeed, bulletDuration);
			setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), bulletDuration);
		},/*]*/
	};
	g.handleActions(actions, data);
}
```

> **Note:** You can change the `bulletSpeed` and `bulletDuration` to affect how fast, and how far your bullet goes.
