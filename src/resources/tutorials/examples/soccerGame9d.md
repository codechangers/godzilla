# 9. Place Blocks

Step (4/7) To be able to place blocks in your game. 

##### 4. In `game.js`, Add an `if` statement so that when you click the moouse it will place a block.

```
// File: code/client/src/game.js
if (g.canSend()) {
		g.sendAction('placeBlock', {x, y});
	}
```