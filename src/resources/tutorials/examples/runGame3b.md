# Run Game - 3.B

## Add enemy movement.

**(Step 2/2)** Move all the enemies back and forth.

### Make the enemies move. 

In `room.js` we need to put a `getAllCharacters` _function_ inside our `onUpdate` _method_.

```javascript
// File: game.js
// Copy
g.getAllCharacters('enemies', (enemy, i) => {
	const padding = 25;
	const speed = 0.01 * i + 0.1;
	const outOfBounds = enemy.x >= GAME_WIDTH - padding || enemy.x <= padding;
	if (outOfBounds) enemy.right = enemy.x > padding;
	const direction = enemy.right ? 1 : -1;
	g.move(enemy, 'x', speed * direction);
});
// End Copy
onUpdate(dt) {
	g.handleCollision('players', 'enemies', (player) => {
		if (player.safe === false) {
			player.x = GAME_WIDTH / 2 - 30;
			player.y = GAME_HEIGHT - 20;
		}
	});/*[*/
	g.getAllCharacters('enemies', (enemy, i) => {
		const padding = 25;
		const speed = 0.01 * i + 0.1;
		const outOfBounds = enemy.x >= GAME_WIDTH - padding || enemy.x <= padding;
		if (outOfBounds) enemy.right = enemy.x > padding;
		const direction = enemy.right ? 1 : -1;
		g.move(enemy, 'x', speed * direction);
	});/*]*/
}
```
