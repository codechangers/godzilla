---
title: useBarrier()
tags: [customize]
author: jason
---
This method is used to make a type of object unable to pass through another type of object.
## Parameters
**type**: `string` - The type of object which should not pass through barriers.

**barrierType**: `string` - The type of object which should become a barrier.
## Returns
**Nothing**
## Usage
You should use this method when you want to create barriers in your game.
# Examples
### Example 1
```
//File code/server/rooms/room.js
onInit() {
	...
	g.userBarrier('players', 'walls');
}
```
