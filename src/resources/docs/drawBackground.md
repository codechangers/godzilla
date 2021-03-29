# drawBackground()

This method will draw the background for your game.

## Parameters

**img**: `string` - The background image used for the game.

**scale**: `number` - Scale of the background image.

**gameW**: `number` - The width of the game.

**gameH**: `number` - The height of the game.
​

## Returns

**Nothing**
​

## Usage

You can use this at any time although, It's recommended to use in your Create function so the background will be there as soon as the game starts.

# Examples

### Example 1

```
//Link code/client/src/game.js
​
create() {
	...
	g.drawBackground('background.png');
}
```

### Example 2

```
//Link code/client/src/game.js
​
create() {
	...
	g.drawBackground('background.png', 0.5, 1000, 2000);
}
```
