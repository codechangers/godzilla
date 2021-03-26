---
title: removeItemFromCharacter()
tags: [customize]
---
This method allows users to remove an item from a specific character's item bar. This can be used to take away functionality or reset in game events.
## Parameters
**character**: `obj` - The character instance.<br><br>
​
**type**: `string` - The type of the item to remove
​
## Returns
**Nothing**
## Usage
This removes one of the items from the item bar and is used anywhere in the file.
# Examples
### Example 1
```
//Link code/server/rooms/room.js
​
onMessage(client, data) {
	const  player = g.getACharacter('players', client.sessionId);
	g.removeItemFromCharacter(player, 'sword');
	...
}
```
