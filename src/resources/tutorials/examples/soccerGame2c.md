# 2. Add a Background

Step (3/3) To create a background for your game.

##### 3. In `game.js`, Update the `drawBackground` _function_ in the `create` _method_

```javascript
// File: code/client/src/game.js
// Copy
g.drawBackground('background', 0.8);
// End Copy
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
  g.drawBackground(/*{*/ 'background',  3,  500,  2000 /*}[*/'background', 0.8/*]*/);
}
```
