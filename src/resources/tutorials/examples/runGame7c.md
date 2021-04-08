# 7. Set up Co-op play

(Step 3/4) To Set up multiplayer gameplay

##### 3. Change our `handleCollision` _function_ for players and enemies in the `onUpdate` _function_ in the `room.js` file.

```javascript
// File: code/client/src/game.js
// Copy
g.handleCollision('players', 'enemy', (player) => {
	if  (player.safe == false)  {
		player.spriteName = "grave";
		player.speed = 0;
		let result = true;
		g.getAllCharacters('players', player => {
			if  (player.speed == 5) {
				result = false;
			}
		})
		if (result == true) {
			g.getACharacter('team', 'team').score =  1;
			g.getAllCharacters('players', player =>
				{ player.x = 270, player.y = 1990, player.spriteName = 'players', player.speed = 5 });
		}
	}
});
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
	});
	g.getAllCharacters('players', player => { player.safe = false });
	g.handleLocations('safeZone', 'players');/*[*/
	g.handleCollision('players', 'enemy', (player) => {
		if (player.safe == false)  {
			player.spriteName = "grave";
			player.speed = 0;
			let result = true;
			g.getAllCharacters('players', player => {
				if  (player.speed == 5) {
					result = false;
				}
			})
			if  (result == true) {
				g.getACharacter('team', 'team').score =  1;
				g.getAllCharacters('players', player =>
					{ player.x = 270, player.y = 1990, player.spriteName = 'players', player.speed = 5 });
			}
		}
	});/*]*/
}
```

Make sure that you don't add another handle collision function, just replace the old one with this new one.
