# 6. Set up Scoring

(Step 2/5) To Set up a scoring system.

##### 2. In the `game.js` file we need to put an `addCharacters` _function_ in the `init` _function_.

```javascript
// File: code/client/src/game.js
// Copy
g.addCharacters('team');
// End Copy
init() {
  g.setup(this);
  g.setSize(GAME_WIDTH, GAME_HEIGHT);
  g.addLocations('safeZone');
  g.addCharacters('players', 0.5);
  g.addCharacters('enemy', 0.5);/*[*/
  g.addCharacters('team');/*]*/
}
```
