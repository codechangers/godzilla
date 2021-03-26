---
title: updateSquare()
tags: [customize]
---
This method will allow you to update a previously drawn square.
## Parameters
**width**: `number` - The width of the new square.

**height**: `number` - The height of the new square.

**x**: `number` - The starting x position of the top left of your square.

**y**: `number` - The starting y position of the top left of your square.

**color**:`string` - The color of your square.

**graphics**`variable` - a variable returned through the createSquare function.
## Returns
**Nothing**
## Usage
This method can be used after you have created at least one square in your game already. It should be used if you want to update the size, color or location of a square you have already drawn.

## Examples
### 1.
```
//Link code/client/src/game.js
create() {
	let square = g.createSquare(500, 500, 50, 150, '111111');
	g.updateSquare(500, 500, 50, 150, '999999', square);
}
```
