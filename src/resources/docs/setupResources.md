---
title: setupResources()
tags: [customize]
author: jason
---
This method will create a set of resources for you to use in your game.
## parameters
**type** : `string`  - The type of resource you want to create.
## Returns
**nothing**
## Usage
This method can be used at any time. You should use this method any time you want to add a new type of resource to your game.
## Examples
​
### Example 1
​
```
// File: code/server/rooms/room.js
onInit() {
	g.setupResources('trees');
	...
}
```
