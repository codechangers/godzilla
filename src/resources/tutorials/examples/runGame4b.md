# Run Game - 4.B

## Add safe zones.

**(Step 2/5)** Listen to safe zone state changes from the server.

### Get the safe zones from the server.

In `game.js` we need to add a `getLocations` _function_ to the `create` _method_.

```javascript
// File: game.js
// Copy
g.getLocations('safeZones');
// End Copy
create() {
  g.setupKeys(keys);
  g.useLoginScreen((name) => g.connect({ name }));
  g.useStore('The Store', []);
  g.drawBackground('background');
  g.getCharacters('players', (player) => {
    if (player.id === g.myId()) {
      g.cameraFollow(player.sprite);
    }
  });
  g.getCharacters('enemies');/*[*/
  g.getLocations('safeZones');/*]*/
}
```
