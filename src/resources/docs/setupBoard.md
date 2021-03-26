---
title: setupBoard()
tags: [customize]
author: jason
---
This method will create your game board with the boundaries set by you.
​
## Parameters
**width**: `number` - The game width<br><br>
​
**height**: `number`  - The game height

**color**: `string`  - The hex value for the color of your game board.
​
## Returns
**Nothing**
## Usage
This method should be used when you're ready to set boundaries on your game.
# Examples
### Example 1
```
//File code/server/rooms/room.js
onInit() {
	...
	g.setupBoard(2000, 3000, '223211');
}
```
