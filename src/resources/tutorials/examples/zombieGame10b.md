# 1 Create a Scoreboard
 (Step 2/3)

##### 2. In `room.js`, in the `onUpdate()` function, inside of your handleCollision method, add a character with a score of 100 using the `getACharacter()` function.

``` javascript
// File: code/server/rooms/room.js
// Copy
g.getACharacter('players', bullet.playerId).score += 100;
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1);
	g.handleAnimations('bullets');
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
	});/*[*/
	g.getACharacter('players', bullet.playerId).score += 100;/*]*/
}

```

Now the scoreboard should be set up and our game is almost finished!
