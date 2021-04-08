# 6. Set up Scoring
 (Step 3/5) To Set up a scoring system.

##### 3. In `game.js`, Add a `getCharacters` function in the create _function_.

```javascript
// File: code/client/src/game.js
// Copy
g.getCharacters('team');
// End Copy
  g.getCharacters('players', player => {
    if (player.id === g.myId()) {
      g.cameraFollow(player.sprite);
    }
  });
  g.getCharacters('enemy');/*[*/
  g.getCharacters('team');/*]*/
  g.drawBackground('background', 3, 500, 2000);
```
