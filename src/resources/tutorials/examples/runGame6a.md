# Run Game - 6.A

## Add scoring to your game.

**(Step 1/8)** Setup teams on the server.

### Setup teams.

In `room.js` we need to add a `setupCharacters` _function_ to the `onInit` _method_.

```javascript
// File: game.js
// Copy
g.setupCharacters('teams');
// End Copy
onInit() {
    g.setup(this);
    g.setBounds(GAME_WIDTH, GAME_HEIGHT);
    g.setupCharacters('players');
    g.setupCharacters('enemies');/*[*/
    g.setupCharacters('teams');/*]*/
    g.setupLocations('safeZones');

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
