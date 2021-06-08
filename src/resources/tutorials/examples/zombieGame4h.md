# Run Game - 4.H

## Add shooting to the game.

**(Step 8/9)** Handle the bullet animations when the server updates.

### Handle bullet animations.

In `room.js`, we need to add a `handleAnimations` _function_ to the `onUpdate` _method_. This will handle our bullet animations!

``` javascript
// File: room.js
// Copy
g.handleAnimations('bullets');
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1);
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});/*[*/
	g.handleAnimations('bullets');/*]*/
}
```
