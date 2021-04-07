# 1 Add a Background
 (Step 6/6) To learn how to add a background to your game!

##### 6. In `room.js`, Change the numbers in our `createACharacter `function in our `onJoin` function in the `room.js` file and add a couple new variables.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RudU-cO2vvU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```
// File: code/server/rooms/room.js
g.createACharacter('players', client.sessionId,  { x:  270, y:  1990, safe:  false, speed:  5, spriteName:  "players"  });
```