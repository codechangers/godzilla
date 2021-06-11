# Zombie Game - 8.B

## Add a game over condition.

**(Step 2/2)** Add score to players when they shoot zombies!

### 100 points per zombie!

In `room.js`, we need to add a `getACharacter` _function_ to the `onUpdate` _method_.

```javascript
// File: room.js
// Copy
g.getACharacter('players', bullet.playerId).score += 100;
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1);
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});
	g.handleAnimations('bullets');
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);/*[*/
		g.getACharacter('players', bullet.playerId).score += 100;/*]*/
	});
}
```

> Now the scoreboard should be set up and our game is almost finished!
