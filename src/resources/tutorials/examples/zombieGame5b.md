# 1 Add a Health Bar
 (Step 2/3)

##### 2. In `room.js`, Create a `handleCollision()` function inside the `onUpdate()` function so that our health bar will update when we collide with zombies.

``` javascript
// File: code/server/rooms/room.js
g.handleCollision('players', 'zombies', (player) => {
	if (player.healthBar.filled > 0) {
		player.healthBar.filled -= 0.1;
	}
});
```