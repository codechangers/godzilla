# 7. Add Scoring A Goal

Step (5/5) To add scoring to your game. 

##### 5. In `game.js` Add a check so we know if the game is over.

```
// File: code/client/src/game.js
},
	() => {},
	(id, attr, value) => {
		if (id === g.myId() && attr === 'lives' && value <= 0) {
			location.reload();
		}
```