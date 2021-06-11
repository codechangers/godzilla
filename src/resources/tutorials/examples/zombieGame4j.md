# Zombie Game - 4.J

## Add shooting to the game.

**(Step 10/10)** Delete zombies when they are hit by a bullet.

### Make it so bullets hit zombies.

In `room.js`, we need to add another `handleCollision` _function_ to our `onUpdate` _method_. This will make it so zombies are deleted when they get hit by a bullet.

``` javascript
// File: room.js
// Copy
g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
			g.deleteACharacter('zombies', zombie.id);
			g.deleteACharacter('bullets', bullet.id);
		});
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1);
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});
	g.handleAnimations('bullets');/*[*/
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
	});/*]*/
}
```
