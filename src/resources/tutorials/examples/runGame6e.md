# Run Game - 6.E

## Add scoring to your game.

**(Step 5/8)** When you make it to the end, get a point and move on to the next level.

### Add win condition.

In `room.js` we need to update our `doWin` _function_ so it gives our team a point, revives all the players and takes us to the next level.

```javascript
// File: room.js
// Copy
const doWin = player => {
  g.getACharacter('teams', 'team1').score += 1;
  g.getAllCharacters('players', p => {
    p.x = GAME_WIDTH / 2;
    p.y = GAME_HEIGHT - p.height / 2;
    p.spriteName = 'players';
    p.speed = 5;
  });
  g.getAllCharacters('enemies', enemy => g.deleteACharacter('enemies', enemy.id));
};
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players');
  g.setupCharacters('enemies');
  g.setupCharacters('teams');
  g.setupLocations('safeZones');

  g.createACharacter('teams', 'team1',
    { x: 10000, y: 10000, name: 'Level', score: 1 });

  const zoneYs = [0, 1000, 1940];
  zoneYs.forEach(y => {
    const doSafe = player => player.safe = true;
    const doWin = player => {/*[*/
      g.getACharacter('teams', 'team1').score += 1;
      g.getAllCharacters('players', p => {
        p.x = GAME_WIDTH / 2;
        p.y = GAME_HEIGHT - p.height / 2;
        p.spriteName = 'players';
        p.speed = 5;
      });
      g.getAllCharacters('enemies', enemy => g.deleteACharacter('enemies', enemy.id));
    /*]*/};
    g.createALocation('safeZones',
      g.nextLocationId('safeZones'), {
        x: 0,
        y,
        width: GAME_WIDTH,
        height: 100
      },
      '6cdc00',
      y === 0 ? doWin : doSafe
    );
  });
```
