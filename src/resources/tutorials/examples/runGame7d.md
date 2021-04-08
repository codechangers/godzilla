# 7. Set up Co-op play
 (Step 4/4) To Set up multiplayer gameplay

##### 4. Add a `handleCollision` _function_ for our players. We will put this in a `setTimeout` _function_. This will be written in our `onUpdate` _function_ in the `room.js` file.

```javascript
// File: code/client/src/game.js
// Copy
setTimeout(function  ()  { g.handleCollision('players',  'players',  (player1)  =>  {  if  (player1.speed ==  0)  { player1.speed =  5, player1.spriteName =  'players'  }  })  },  500);
// End Copy
  onUpdate(dt) {
/*[*/setTimeout(function  ()  { g.handleCollision('players',  'players',  (player1)  =>  {  if  (player1.speed ==  0)  { player1.speed =  5, player1.spriteName =  'players'  }  })  },  500);/*]*/
    g.getAllCharacters('players', player =>  { player.safe =  false  });
```

And we should now have a fully functioning game! Feel free to customize it and change or add whatever you like!

<hr class="uk-margin-medium">