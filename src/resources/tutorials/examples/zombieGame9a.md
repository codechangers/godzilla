# Zombie Game - 9.A

## Add zombie rotation.

**(Step 1/1)** Zombies face the player they are chasing.

### Zombies rotate.

In `room.js`, we need to add a `getRotationTowards` _function_ to our `follow` _function_ in the `onUpdate` _function_.

``` javascript
// File: room.js
// Copy
g.follow('players', 'zombies', 1, 0.1,
			(player, zombie) => {
				zombie.rotation = g.getRotationTowards(zombie, player.x, player.y);
			});
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1/*{*/);/*}[*/,
		(player, zombie) => {
			zombie.rotation = g.getRotationTowards(zombie, player.x, player.y);
		});/*]*/
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});
	g.handleAnimations('bullets');
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
		g.getACharacter('players', bullet.playerId).score += 100;
	});
}
```

> We should now have a fully functioning game! Customize it and change or add whatever you like!
