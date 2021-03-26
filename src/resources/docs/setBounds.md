---
title: setBounds()
tags: [customize]
author: jason
---
This method will create bounds on the map for how far your character will be able to walk.
## parameters
**width**: `number` - How wide the game is
 
**height**: `number` - How tall the game is
## Returns
**Nothing**
## Usage
You can use this method at any time. You should use this when you are ready to set bounds on how big the game should be.
# Examples
### Example 1
```
//File code/server/rooms/room.js
onInit() {
	...
	g.setBounds(1000, 5000);
}
```
