---
title: switchItem()
tags: [customize]
---
This method allows players to switch their characters selected item. This can be called with a specific index or used to toggle through each item.
## Parameters
**character**: `obj` - The character instance.<br><br>
​
**position**: `number` - The index of the item on the hot bar you want to select.
## Returns
**Nothing**
## Usage
If there is no position it just goes to the next item, but with a position it will switch to that item on the hot bar to use.
# Examples
### Example 1
```
//Link code/server/rooms/room.js
​
onMessage() {
	const player = g.getACharacter('players', client.sessionId);
	g.switchItem(player);
	...
}
```
### Example 2
```
//Link code/server/rooms/room.js
​
onMessage() {
	const player = g.getACharacter('players', client.sessionId);
	g.switchItem(player, 1);
}
```
