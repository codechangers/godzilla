# Run Game - 3.B

## Add player health bars.

**(Step 2/2)** Decrease player health when they get hit by a zombie.

### Make players take damage from zombies.

In `room.js`, we need to add a `handleCollision` _function_ to the `onUpdate` _method_. This will make it so the players take damage when they get hit by a zombie.

``` javascript
// File: room.js
// Copy
g.handleCollision('players', 'zombies', (player) => {
			if (player.healthBar.filled > 0) {
				player.healthBar.filled -= 0.1;
			}
		});
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1);/*[*/
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});/*]*/
}
```
