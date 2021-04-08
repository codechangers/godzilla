# 7. Set up Co-op play

(Step 4/4) To Set up multiplayer gameplay

##### 4. Add a `handleCollision` _function_ for our players. We will put this in a `setTimeout` _function_. This will be written in our `onUpdate` _function_ in the `room.js` file.

```javascript
// File: code/client/src/game.js
// Copy
setTimeout(() => {
  g.handleCollision('players', 'players', (player1) => {
    if (player1.speed == 0) {
      player1.speed =  5;
      player1.spriteName = 'players';
     }
  });
}, 500);
// End Copy
  g.handleCollision('players', 'enemy', (player) => {
    if (player.safe == false)  {
      player.spriteName = "grave";
      player.speed = 0;
      let result = true;
      g.getAllCharacters('players', player => {
        if  (player.speed == 5) {
          result = false;
        }
      })
      if  (result == true) {
        g.getACharacter('team', 'team').score =  1;
        g.getAllCharacters('players', player =>
          { player.x = 270, player.y = 1990, player.spriteName = 'players', player.speed = 5 });
      }
    }
  });/*[*/
  setTimeout(() => {
    g.handleCollision('players', 'players', (player1) => {
      if (player1.speed == 0) {
        player1.speed =  5;
        player1.spriteName = 'players';
      }
    });
  }, 500);/*]*/
}
```

And we should now have a fully functioning game! Feel free to customize it and change or add whatever you like!
