# Run Game - 6.H

## Add scoring to your game.

**(Step 8/8)** Respawn enemies more enemies on every level.

### Add enemies on new levels.

In `room.js` we need to add another `spawnEnemies` call inside our `doWin` _function_.

```javascript
// File: room.js
// Copy
const doWin = player => {
	const teamScore = g.getACharacter('teams', 'team1').score += 1;
	g.getAllCharacters('players', p => {
		p.x = GAME_WIDTH / 2;
		p.y = GAME_HEIGHT - p.height / 2;
		p.spriteName = 'players';
		p.speed = 5;
	});
	g.getAllCharacters('enemies', enemy => g.deleteACharacter('enemies', enemy.id));
	this.spawnEnemies(teamScore);
};
// End Copy
	const zoneYs = [0, 1000, 1940];
	zoneYs.forEach(y => {
		const doSafe = player => player.safe = true;
		const doWin = player => {
			/*[*/const teamScore = /*]*/g.getACharacter('teams', 'team1').score += 1;
			g.getAllCharacters('players', p => {
				p.x = GAME_WIDTH / 2;
				p.y = GAME_HEIGHT - p.height / 2;
				p.spriteName = 'players';
				p.speed = 5;
			});
			g.getAllCharacters('enemies', enemy => g.deleteACharacter('enemies', enemy.id));/*[*/
			this.spawnEnemies(teamScore);/*]*/
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


	this.spawnEnemies();

}
