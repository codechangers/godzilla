# 1 Create a Scoreboard
 (Step 2/3)

##### 2. In `room.js`, in the onupdate function, inside of your handleCollision method add a character with a score of 100 using the `getACharacter()` function.

``` javascript
// File: code/server/rooms/room.js
// Copy
g.getACharacter('players', bullet.playerId).score += 100;
// End Copy
/*[*/g.getACharacter('players', bullet.playerId).score += 100;/*]*/
```

Now the scoreboard should be set up and our game is almost finished!
