## 1. Setup Leaderboard
To setup a leaderboard the handleLeaderboard method needs to be used in game.js file, in the create function, then in the getCharacters function for the character that the leaderboard is for. The handle Leaderboard will be passed into the getCharacters function as the second third and fourth parameters, so that the leader board will update when a player joins, when a player's score is updated, and when a player leaves the game. 
```javascript
g.getCharacters('players', (player, data) => {
	g.handleLeaderboard('players', 'Scoreboard')},
	(player) => { g.handleLeaderboard('players', 'Scoreboard') },
	(id, attr, value) => { g.handleLeaderboard('players', 'Scoreboard')}
);
```
## 2. Setup Score
To set up the score for the leaderboard the room.js file needs to be updated. Wherever the createACharacter function is  for the character that the leaderboard is for. We need to add another piece of data into the object parameter passed into the character, called score, and set it to 0.
```javascript
g.createACharacter('players', client.sessionId, { x:  200, y:  200, score:  0, name:  data.name, spriteName:  data.spriteName });
```
Then you just need to add to the score when something happens that you want to cause the users score to be raised. In this example, when a bullet hits a zombie, the player who shot the bullet will get their score raised by 100.
```javascript
g.handleCollision('bullet', 'zombie', (bullet, zombie) => { g.deleteACharacter("zombie", zombie.id); g.deleteACharacter("bullet", bullet.id); g.getACharacter('players', bullet.playerId).score += 100 })
```
