# 9. Place Blocks

Step (3/7) To be able to place blocks in your game.

##### 3. In `game.js`, Add `getCharacters` function to add the blocks to the game.

```javascript
// File: code/client/src/game.js
// Copy
g.getCharacters('blocks');
// End Copy
  g.drawBackground('background', 0.8);
  g.getCharacters('goals');
  g.getCharacters('soccerBalls');/*[*/
  g.getCharacters('blocks');/*]*/
```
