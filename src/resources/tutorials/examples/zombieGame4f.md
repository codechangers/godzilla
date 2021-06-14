# Zombie Game - 4.F

## Add shooting to the game.

**(Step 6/10)** Create a new method called shoot bullet.

### Create the shoot bullet logic.

In `room.js`, we need to create a new _method_ called `shootBullet` right below our `onLeave` _method_.

``` javascript
// File: room.js
// Copy
shootBullet(player, data) {
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
	}
// End Copy
	onLeave(client) {
		g.deleteACharacter('players', client.sessionId);
	}/*[*/

	shootBullet(player, data) {
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
	}/*]*/
};
```

> **Note:** You can change the `bulletSpeed` and `bulletDuration` to affect how fast, and how far your bullet goes.
