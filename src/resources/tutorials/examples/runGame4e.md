# Run Game - 4.E

## Add safe zones.

**(Step 5/5)** Enable safe zone functionality.

### Turn on the safe zones.

In `room.js` we need to add a couple different _functions_ to our `onUpdate` _method_. First we need a `getAllCharacters` to reset our `safe` setting to `false`. Then we need a `handleLocations` _function_ to allow the location to run while we are inside it!

```javascript
// File: room.js
// Copy
g.getAllCharacters('players', player => player.safe = false);
g.handleLocations('safeZones', 'players');
// End Copy
onUpdate(dt) {
	g.handleCollision('players', 'enemies', (player) => {
		if (!player.safe) {
			player.x = GAME_WIDTH / 2;
			player.y = GAME_HEIGHT - player.height / 2;
		}
	});
	g.getAllCharacters('enemies', (enemy, i) => {
		const padding = enemy.width / 2;
		const speed = 0.01 * i + 0.1;
		const outOfBounds = enemy.x >= GAME_WIDTH - padding || enemy.x <= padding;
		if (outOfBounds) enemy.right = enemy.x < GAME_WIDTH / 2;
		const direction = enemy.right ? 1 : -1;
		g.move(enemy, 'x', speed * direction);
	});/*[*/
	g.getAllCharacters('players', player => player.safe = false);
	g.handleLocations('safeZones', 'players');/*]*/
}
```

> For now when we make it to the end of the level our players are sent back to the beginning. Later we’ll set up levels so that we progress every time we make it to the end.
