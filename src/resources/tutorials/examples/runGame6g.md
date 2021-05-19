# Run Game - 6.G

## Add scoring to your game.

**(Step 7/8)** Respawn enemies more enemies on every level.

### Replace old respawn logic.

In `room.js` we need to call our new `spawnEnemies` _method_ when we want to add enemies to the game inside our `onInit` _method_.

```javascript
// File: room.js
// Copy
this.spawnEnemies();
// End Copy
	const zoneYs = [0, 1000, 1940];
	zoneYs.forEach(y => {
		const doSafe = player => player.safe = true;
		const doWin = player => {
			g.getACharacter('teams', 'team1').score += 1;
			g.getAllCharacters('players', p => {
				p.x = GAME_WIDTH / 2;
				p.y = GAME_HEIGHT - p.height / 2;
				p.spriteName = 'players';
				p.speed = 5;
			});
			g.getAllCharacters('enemies', enemy => g.deleteACharacter('enemies', enemy.id));
		};
		g.createALocation('safeZones',
			g.nextLocationId('safeZones'), {
				x: 0,
				y,
				width: GAME_WIDTH,
				height: 100
			},
			'6cdc00',
			y === 0 ? doWin : doSafe
		);
	});


	/*{*/const enemyCount = 15;
	const enemyMaxX  = GAME_WIDTH  - 100;
	const enemyMaxY  = GAME_HEIGHT - 100;
	for (let i = 0; i < enemyCount; i++) {
		g.createACharacter('enemies',
			g.nextCharacterId('enemies'),
			{
				x: Math.floor(Math.random() * enemyMaxX) + 1,
				y: Math.floor(Math.random() * enemyMaxY) + 1,
			}
		);
	}/*}[*/this.spawnEnemies();/*]*/

}
