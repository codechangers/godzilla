# Soccer Game - 7.A

## Add scoring to your game.

**(Step 1/5)** Update the player data to have a score.

### Update player data.

In `room.js` we need to change the `createACharacter` _function_ for **players** in the `onJoin` _method_.

```javascript
// File: room.js
// Copy
g.createACharacter('players', client.sessionId,
	{ ...data, x, y, score: 0, lives: 3, block3s: 0, block5s: 0 });
// End Copy
onJoin(client, data) {
  const x = Math.floor(Math.random() * GAME_WIDTH);
  const y = Math.floor(Math.random() * GAME_HEIGHT);
  g.createACharacter('players', client.sessionId, /*[*/
		/*]*/{ x, y, ...data/*[*/, score: 0, lives: 3, block3s: 0, block5s: 0/*]*/ });
  g.createACharacter('goals', client.sessionId, { x, y });
  this.addABall();
}
```

> **This data sets your players lives that they start with, and blocks that they start with.**
