# 1 Setup Login Screen
 (Step 3/4)

##### 3. In `room.js`, Delete the existing `createACharacter()` function and replace it with a new one!

``` javascript
// File: code/server/rooms/room.js
g.createACharacter('players', client.sessionId, { x: 200, y: 200, score: 0, ...data });
```