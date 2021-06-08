# 9. Set Zombies Rotation
 (Step 1/2)

##### 1. in `room.js` in the `onUpdate()`, Delete the old `follow()` function and add the following `follow()` function with updated data.

``` javascript
// File: room.js
// Copy
g.follow('players', 'zombies', 1, 0.1,
	(player, zombie) => {
		zombie.rotation = g.getRotationTowards(zombie, player.x, player.y);
	});
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1/*[*/,
		(player, zombie) => {
			zombie.rotation = g.getRotationTowards(zombie, player.x, player.y);
		}/*]*/);
	g.handleAnimations('bullets');
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
		g.getACharacter('players', bullet.playerId).score += 100;
	});
}
```

> We should now have a fully functioning game! Customize it and change or add whatever you like!
