---
title: setupCharacters()
tags: [customize]
author: jason
---
This method will setup a set of characters. A set of characters represents a certain group of characters, for example: players and enemies, or storm troopers and wizards.
​
## Parameters
 **type**: `string` - The name of the character group, ie. players, wizards, goblins.

 **shape**: `string` - The shape of the character image, ie. circle or box.

## Returns
**Nothing**
​
## Usage
This method should only be called in the `onInit` method of the `room.js` file. It should always be called with a *type* but the *shape* is optional.
​
## Examples
### Example 1
```
// File: code/server/rooms/room.js
onInit() {
	g.setupCharacters('players');
	...
}
```
### Example 2
```
// File: code/server/rooms/room.js
onInit() {
	g.setupCharacters('goblins', 'circle');
	...
}
```
