# createSquare()

This method will create a square to be used inside the game.

## Parameters

**width**: `number` - The width of the square you want to create.

**height**: `number` - The height of the square you want to create.

**x**: `number` - The starting x position of the top left of your square.

**y**: `number` - The starting y position of the top left of your square.

**color**: `string` - The color of your square as a hex value. e.g. "125242".

**depth**: `number` - The ranking used to decide what layer the square is on (what is drawn over and below the square.)
​

## Returns

**graphics** - The graphics used to show your square on the screen.
​

## Usage

This method can be used at anytime. It should be used to make your game more interesting, creating obstacles, paths, platforms, or anything else you can imagine.

# Examples

### Example 1

```
//File code/client/src/game.js
​
create() {
	...
	g.createSquare(20, 50, 200, 400, '242424');
}
```

### Example 2

```
//File code/client/src/game.js
​
create() {
	...
	g.createSquare(40, 12, 444, 122, '800080', 2);
}
```

### Example 3 (Advanced)

```
//File code/client/src/game.js
​
create() {
	...
	let squareGraphic = g.createSquare(40, 900, 400, 200, '232323', 2);
	squareGraphic.setScale(0.2);
}
```
