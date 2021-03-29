# loadImage()

This method will load an image into the game

## Parameters

**name**: `string` The name of the image you want to use.

**path**: `string` The path to the image file inside of the asset folder.

## Returns

**this.game.load.image(name, `asset/${path}`)** -the code used to load your image into the game for you

## Usage

This should be used anytime you need an image somewhere in your game.

# Examples

### Example 1

```
//File code/client/src/game.js
preload() {
	...
	g.loadImage('pikachu', 'pikachu.jpg');
	g.loadImage('goblins', 'goblin.png');
}
```
