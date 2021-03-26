---
title: useItem()
tags: [customize]
---
This method will allow you to use an Item's in-game ability. 
## Parameters 
**character**: `object` - The character that will have access to the item.

**data**: `object` - Any data that they want to pass to their useItem function.
## Returns
**Nothing**
## Usage
You can use this method once you have a character held item set up in your game. You should use it when wanting to use the item's in game ability. 
## Examples
### 1. 
```
// File: code/server/rooms/room.js
onMessage(client, data){
	click(){
		g.useItem(player, data)
	}
}
```
