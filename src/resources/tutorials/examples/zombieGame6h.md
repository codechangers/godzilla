# 4. Setup Bullets
 (Step 8/10)

##### 8. In `room.js`, add the `handleAnimations()` function in the `onUpdate()` function.

``` javascript
// File: code/server/rooms/room.js
// Copy
g.handleAnimations('bullets');
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1);/*[*/
	g.handleAnimations('bullets');/*]*/
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});
}
```