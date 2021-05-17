# Run Game - 4.A

## Add safe zones.

**(Step 1/5)** Add safe zone locations.

### Add safe zone locations.

In `game.js` we need to a an `addLocations` _function_ to our `init` _method_.

```javascript
// File: game.js
// Copy
g.addLocations('safeZones');
// End Copy
init() {
    g.setup(this);
    g.setSize(GAME_WIDTH, GAME_HEIGHT);
    g.cameraBounds();
    g.addCharacters('players', 0.5);
    g.addCharacters('enemies', 0.5);/*[*/
    g.addLocations('safeZones');/*]*/
}
```
