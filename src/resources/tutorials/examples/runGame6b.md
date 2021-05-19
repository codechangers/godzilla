# Run Game - 6.B

## Add scoring to your game.

**(Step 2/8)** Add teams to the client.

### Add teams.

In `game.js` we need to add an `addCharacters` _function_ to the `init` _method_.

```javascript
// File: game.js
// Copy
g.addCharacters('teams');
// End Copy
init() {
  g.setup(this);
  g.setSize(GAME_WIDTH, GAME_HEIGHT);
  g.cameraBounds();
  g.addCharacters('players', 0.5);
  g.addCharacters('enemies', 0.5);/*[*/
  g.addCharacters('teams');/*]*/
  g.addLocations('safeZones');
}
```
