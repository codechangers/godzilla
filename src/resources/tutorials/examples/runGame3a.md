# Run Game - 3.A

## Add enemy movement.

**(Step 1/2)** Handle enemy and player collisions.

### Handle enemy collisions.

In `room.js` we need to add a `handleCollision` _function_ to our `onUpdate` _method_. When the player runs into an enemy we should send them back to the beginning of the level.


```javascript
// File: game.js
// Copy
g.handleCollision('players', 'enemies', (player) => {
	if (!player.safe) {
		player.x = GAME_WIDTH / 2;
		player.y = GAME_HEIGHT - player.height / 2;
	}
});
// End Copy
onUpdate(dt) {
	/*[*/g.handleCollision('players', 'enemies', (player) => {
		if (!player.safe) {
			player.x = GAME_WIDTH / 2;
			player.y = GAME_HEIGHT - player.height / 2;
		}
	});/*]*/
}
```
