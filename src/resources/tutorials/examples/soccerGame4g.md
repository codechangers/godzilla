# 4. Add Goals

Step (7/8) To create goals for your game

##### 7. In `room.js` Add `CreateaChracter` function to add Goals for each player.

```
// File: code/server/rooms/room.js
// Copy
g.createACharacter('goals', client.sessionId, { x, y });
// End Copy
/*[*/g.createACharacter('goals', client.sessionId, { x, y });/*]*/
```