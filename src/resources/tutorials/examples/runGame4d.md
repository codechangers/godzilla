# Run Game - 4.D

## Add safe zones.

**(Step 4/5)** Create each safe zone at a specific position.

### Create the safe zones.

In `room.js` we need to add a `createLocation` _function_ for each of the safe zones we want to create. We can do this inside a _loop_ in our `onInit` _method_.

```javascript
// File: room.js
// Copy
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
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players');
  g.setupCharacters('enemies');
  g.setupLocations('safeZones');/*[*/

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
  });/*]*/

  const enemyCount = 15;
  const enemyMaxX  = GAME_WIDTH  - 100;
  const enemyMaxY  = GAME_HEIGHT - 100;
  for (let i = 0; i < enemyCount; i++) {
    g.createACharacter('enemies',
      g.nextCharacterId('enemies'),
      {
        x: Math.floor(Math.random() * enemyMaxX) + 1,
        y: Math.floor(Math.random() * enemyMaxY) + 1,
      }
    );
  }

}
```
