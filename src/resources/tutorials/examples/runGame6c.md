# Run Game - 6.C

## Add scoring to your game.

**(Step 3/8)** Listen to teams state from the server.

### Get teams from the server.

In `game.js` we need to add a `getCharacters` _function_ to our `create` _method_.

```javascript
// File: game.js
// Copy
g.getCharacters('teams');
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
  g.getCharacters('teams');/*]*/
  g.getLocations('safeZones');
}
```
