# 4. Set Up Safe Zones

(Step 5/5) To Set up safe zones and an end zone.

##### 5. Go into our `onUpdate` _function_ in the `room.js` file and add a `getAllCharacters` _function_ and a `handleLocations` _function_.

```javascript
// File: code/server/rooms/room.js
// Copy
g.getAllCharacters('players', player => { player.safe = false });
g.handleLocations('safeZone', 'players');
// End Copy
onUpdate(dt) {
	g.handleCollision('players', 'enemy', (player) => {
		if (player.safe === false) {
			player.x = 270;
			player.y = 1980;
		}
	});
	g.getAllCharacters('enemy', (enemy, i) => {
		if (enemy.x <= 575 && enemy.right == true) {
			g.move(enemy, 'x', 0.01 * i + 0.1);
		} else if (enemy.x >= 25) {
			enemy.right = false;
			g.move(enemy, 'x', -0.01 * i - 0.1);
		} else {
			enemy.right = true;
		}
	});/*[*/
	g.getAllCharacters('players', player => { player.safe = false });
	g.handleLocations('safeZone', 'players');/*]*/
}
```

Now when we make it to the end our players are sent back to the first, later we’ll set up level’s so that we progress every time we make it to the end.
