# Run Game - 6.D

## Add scoring to your game.

**(Step 4/8)** Create teams for the game.

### Create teams.

In `room.js` we need to add a `createACharacter` _function_ to the `onInit` _method_.

```javascript
// File: room.js
// Copy
g.createACharacter('teams', 'team1',
  { x: 10000, y: 10000, name: 'Level', score: 1 });
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players');
  g.setupCharacters('enemies');
  g.setupCharacters('teams');
  g.setupLocations('safeZones');/*[*/

  g.createACharacter('teams', 'team1',
    { x: 10000, y: 10000, name: 'Level', score: 1 });/*]*/

  const zoneYs = [0, 1000, 1940];
  zoneYs.forEach(y => {
    const doSafe = player => player.safe = true;
    const doWin = player => {};
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
