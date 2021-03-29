# cameraFollow()

This method will get the camera to follow one of the sprites in the game.

## Parameters

**Sprite**: `Phaser.sprite` - The sprite you would like to have the camera follow.

## Returns

**Nothing**

## Usage

This can be used after you have created a character, it should be used if you want the camera to follow your sprite anywhere it goes.

# Examples

### Example 1

```
//File code/client/src/game.js
​
create() {
	...
	g.getCharacters('players', player => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
}
```
