# createSprite()

This method will create an a sprite to be used in-game for characters, resources etc.
​

## Parameters

**image**: `string` - The name of the image to make a sprite with.

**x**: `number` - The x position of your sprite.

**y**: `number` - The y position of your sprite.

**scale**: `number` - The scale of the sprite, ie. 0.5 for half size.
​

## Returns

**sprite** - your sprite image to be used in the game.
​

## Usage

This method can be used at any point, You should use this when you want to create an image on your page.

# Examples

### Example 1

```
//File code/client/src/game.js
​
create() {
	...
	g.createSprite('players', 50, 100);
}
```

### Example 2

```
//File code/client/src/game.js
​
create() {
	...
	let goblinSprite = g.createSprite('goblins', 20, 40, 0.5);
	g.cameraFollow(goblinSprite);
}
```
