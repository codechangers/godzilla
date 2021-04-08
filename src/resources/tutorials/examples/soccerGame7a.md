# 7. Add Scoring A Goal

Step (1/5) To add scoring to your game. 

##### 1. In `room.js`, Add data to the players.

```
// File: code/server/rooms/room.js
// Copy 
g.createACharacter('players', client.sessionId,
		{ ...data, x, y, score: 0, lives: 3, block3s: 0, block5s: 0 });
// End Copy
/*[*/g.createACharacter('players', client.sessionId,
		{ ...data, x, y, score: 0, lives: 3, block3s: 0, block5s: 0 });/*]*/
```

> **This data sets your players lives that they start with, and blocks that they start with.**
