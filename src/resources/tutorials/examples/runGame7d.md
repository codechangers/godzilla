# 7. Set up Co-op play
 (Step 4/4) To Set up multiplayer gameplay

##### 4. Add a `handleCollision` _function_ for our players. We will put this in a `setTimeout` _function_. This will be written in our `onUpdate` _function_ in the `room.js` file.

```
// File: code/client/src/game.js
setTimeout(function  ()  { g.handleCollision('players',  'players',  (player1)  =>  {  if  (player1.speed ==  0)  { player1.speed =  5, player1.spriteName =  'players'  }  })  },  500);
```

And we should now have a fully functioning game! Feel free to customize it and change or add whatever you like!

<hr class="uk-margin-medium">