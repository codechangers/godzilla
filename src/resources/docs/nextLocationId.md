---
title: nextLocationId()
tags: [customize]
---
This method allows you to get an incremental Id for a location.
## Parameters
**type** : `string` - The type of locations you want the Id for.
## Returns
**${type}\${Object.keys(this.game.state[type]).length + 1}** - This will be your id number for the location that you are looking at.
## Usage
You can use this method once you have a defined location in your game. You should use this method when you are trying to better distinguish your locations in your game.
# Examples
### Example 1
```
//File code/server/rooms/room.js
onInit() {
	...
	g.createALocation('safeZone', g.nextLocationId('fireZone'), {x: 50, y: 50, width: 20, height: 100}, '993311', character => {
		character.health.filled -= 1;
	});
}
```
