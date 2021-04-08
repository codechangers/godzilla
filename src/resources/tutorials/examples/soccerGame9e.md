# 9. Place Blocks

Step (5/7) To be able to place blocks in your game.

##### 5. In `room.js`, Add `setupCharacters`, function to setup the block.

```javascript
// File: code/server/rooms/room.js
// Copy
g.setupCharacters('blocks');
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players', 'circle');
  g.setupCharacters('goals', 'circle');
  g.setupCharacters('soccerBalls', 'circle');/*[*/
  g.setupCharacters('blocks');/*]*/
}
```
