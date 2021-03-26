---
title: setupLocations()
tags: [customize]
---
This method will initialize the locations feature for the server.
## Parameters
**type**: `string` - The type of location you would like to create.
## Returns
**Nothing**
## Usage
You should use this method when you want to start creating custom locations around the map.
# Examples
### Example 1
​
```
// File: code/server/rooms/room.js
onInit() {
	g.setupLocations('safeZone');
	...
}
```
