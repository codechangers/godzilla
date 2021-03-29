# getSpriteSize()

This method can be used to get the size of an image at a certain scale.

## Parameters

**image**:`string` - The name of the image to make a sprite with.

**scale**:`number` - The size of the sprite. ie. 0.5 for half size.

## Returns

**{width, height}** - an object with the width and height of the sprite/image.

## Usage

You can use this method to get the size of an image at a certain scale.

## Examples

### 1.

```
//Link code/client/src/game.js
create() {
	let size = g.getSpriteSize('players', 0.5);
	g.createSquare(size.width, size.height, 50, 150 '999999');
}
```
