# 7. Add Scoring A Goal

Step (4/5) To add scoring to your game. 

##### 4. In `room.js`, Add this code so we can update the lives and scores when a goal is made.

```
// File: code/server/rooms/room.js
g.handleCollision('goals', 'soccerBalls', (goal, ball) => {
		if (ball.kicker !== goal.id) {
			g.getACharacter('players', ball.kicker).score += 1;
			g.getACharacter('players', goal.id).lives -= 1;
			g.deleteACharacter('soccerBalls', ball.id);
			setTimeout(() => this.addABall(), 3000);
		}
	});
```
