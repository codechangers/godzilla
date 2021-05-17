# Run Game - 4.C

## Add safe zones.

**(Step 3/5)** Setup the safe zone locations on our server.

### Setup safe zone locations.

In `room.js` we need to add a `setupLocations` _function_ to our `onInit` _method_.

```javascript
// File: room.js
// Copy
g.setupLocations('safeZones');
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players');
  g.setupCharacters('enemies');/*[*/
  g.setupLocations('safeZones');/*]*/

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
