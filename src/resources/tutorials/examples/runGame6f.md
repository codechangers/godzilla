# Run Game - 6.F

## Add scoring to your game.

**(Step 6/8)** Respawn enemies more enemies on every level.

### Add respawn logic.

In `room.js` we need to move our enemy spawning logic to a new _method_ called `spawnEnemies`.

```javascript
// File: room.js
// Copy
spawnEnemies(difficulty = 0) {
	const enemyCount = 15;
	const enemyMaxX  = GAME_WIDTH  - 100;
	const enemyMaxY  = GAME_HEIGHT - 100;
	for (let i = 0; i < difficulty + enemyCount; i++) {
		g.createACharacter('enemies',
			g.nextCharacterId('enemies'),
			{
				x: Math.floor(Math.random() * enemyMaxX) + 1,
				y: Math.floor(Math.random() * enemyMaxY) + 1,
			}
		);
	}
}
// End Copy
	onLeave(client) {
		g.deleteACharacter('players', client.sessionId);
	}/*[*/

	spawnEnemies(difficulty = 0) {
		const enemyCount = 15;
    const enemyMaxX  = GAME_WIDTH  - 100;
    const enemyMaxY  = GAME_HEIGHT - 100;
    for (let i = 0; i < difficulty + enemyCount; i++) {
      g.createACharacter('enemies',
        g.nextCharacterId('enemies'),
        {
          x: Math.floor(Math.random() * enemyMaxX) + 1,
          y: Math.floor(Math.random() * enemyMaxY) + 1,
        }
      );
    }
	}/*]*/
};
```
