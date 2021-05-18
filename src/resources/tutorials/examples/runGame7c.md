# Run Game - 7.C

## Add co-operative play.

**(Step 3/4)** Make it so players go down when they run into enemies.

### Add downed players.

In `room.js` we need to change our `handleCollision` _function_ for players and enemies in the `onUpdate` _method_.

```javascript
// File: game.js
// Copy
g.handleCollision('players', 'enemies', (player) => {
	if (!player.safe) {
		player.spriteName = "grave";
		player.speed = 0;
		let result = true;
		g.getAllCharacters('players', p => {
			if (p.speed == 5) result = false;
		});
		if (result) {
			g.getACharacter('teams', 'team1').score = 1;
			g.getAllCharacters('players', p => {
				p.x = GAME_WIDTH / 2;
				p.y = GAME_HEIGHT - p.height / 2;
				p.spriteName = 'players';
				p.speed = 5;
			});
		}
	}
});
// End Copy
onUpdate(dt) {
	g.handleCollision('players', 'enemies', (player) => {
		if (!player.safe) {
			/*{*/player.x = GAME_WIDTH / 2;
			player.y = GAME_HEIGHT - player.height / 2;/*}[*/player.spriteName = "grave";
			player.speed = 0;
			let result = true;
			g.getAllCharacters('players', p => {
				if (p.speed == 5) result = false;
			});
			if (result) {
				g.getACharacter('teams', 'team1').score = 1;
				g.getAllCharacters('players', p => {
					p.x = GAME_WIDTH / 2;
					p.y = GAME_HEIGHT - p.height / 2;
					p.spriteName = 'players';
					p.speed = 5;
				});
			}/*]*/
		}
	});
	g.getAllCharacters('enemies', (enemy, i) => {
		const padding = enemy.width / 2;
		const speed = 0.01 * i + 0.1;
		const outOfBounds = enemy.x >= GAME_WIDTH - padding || enemy.x <= padding;
		if (outOfBounds) enemy.right = enemy.x < GAME_WIDTH / 2;
		const direction = enemy.right ? 1 : -1;
		g.move(enemy, 'x', speed * direction);
	});
	g.getAllCharacters('players', player => player.safe = false);
	g.handleLocations('safeZones', 'players');
}
```

> **Make sure that you don't add another handle collision function, just replace the old code with the new code!**
