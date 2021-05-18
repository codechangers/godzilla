# Run Game - 7.D

## Add co-operative play.

**(Step 4/4)** Make it so players revived when they run into each other.

### Add player revival.

In `room.js` we need to add a new `handleCollision` _function_ to our `onUpdate` _method_. This collision will allow players to revive each other.

```javascript
// File: game.js
// Copy
setTimeout(() => {
  g.handleCollision('players', 'players', (player1) => {
    if (player1.speed == 0) {
      player1.speed =  5;
      player1.spriteName = 'players';
    }
  });
}, 500);
// End Copy
onUpdate(dt) {
  g.handleCollision('players', 'enemies', (player) => {
    if (!player.safe) {
      player.spriteName = "grave";
      player.speed = 0;
      let result = true;
      g.getAllCharacters('players', p => {
        if (p.speed == 5) result = false;
      });
      if (result) {
        g.getACharacter('teams', 'team1').score = 1;
        g.getAllCharacters('players', p => {
          p.x = GAME_WIDTH / 2;
          p.y = GAME_HEIGHT - p.height / 2;
          p.spriteName = 'players';
          p.speed = 5;
        });
      }
    }
  });
  g.getAllCharacters('enemies', (enemy, i) => {
    const padding = enemy.width / 2;
    const speed = 0.01 * i + 0.1;
    const outOfBounds = enemy.x >= GAME_WIDTH - padding || enemy.x <= padding;
    if (outOfBounds) enemy.right = enemy.x < GAME_WIDTH / 2;
    const direction = enemy.right ? 1 : -1;
    g.move(enemy, 'x', speed * direction);
  });
  g.getAllCharacters('players', player => player.safe = false);
  g.handleLocations('safeZones', 'players');/*[*/
  setTimeout(() => {
    g.handleCollision('players', 'players', (player1) => {
      if (player1.speed == 0) {
        player1.speed =  5;
        player1.spriteName = 'players';
      }
    });
  }, 500);/*]*/
}
```
