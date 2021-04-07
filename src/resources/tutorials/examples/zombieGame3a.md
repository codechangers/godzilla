# 1 Setup Camera Follow
 (Step 1/2)

##### 1. In `game.js`, Setup the camera follow function in the `create()` function.

``` javascript
// File: code/client/src/game.js
	g.getCharacters('players', (player) => {
	if (player.id === g.myId()) {
		g.cameraFollow(player.sprite);
	}
});
```

> **Make sure that you **don't** write a new [getCharacters](/docs/getCharacters/) _function_, just change the one you already had for `'players'`.**