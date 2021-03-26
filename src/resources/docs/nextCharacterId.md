---
title: nextCharacterId()
subtitle: 'This method will create a new set of characters. A set of characters represents a certain group of characters, for example: players and enemies, or storm troopers and wizards.'
tags: [customize]
author: jason
---
## Parameters
**type**: `string`  The name of the character group, ie. players, wizards, goblins.

**scale**: `number`  The scale of the character image, ie. 0.5 for half size.
​
## Returns
**Nothing**
​
## Usage
This method should only be called in the `init` method of the `game.js` file. It should always be called with a *type* but the *scale* is optional.
​
## Examples
### Example 1
```
// File: code/client/src/game.js
init() {
	g.addCharacters('players');
	...
}
```
### Example 2
```
// File: code/client/src/game.js
init() {
	g.addCharacters('goblins', 0.5);
	...
}
```
