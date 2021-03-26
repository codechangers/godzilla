---
title: sendCharacterSize()
tags: [customize]
---
This method will send the size of a sprite to the server.
## Parameters
**type**: `string` - The name of the image used by the sprite.<br><br>
​
**scale**: `number` - The scale of the sprite, ie. 0.5 for half size.
## Returns
**Nothing**
## Usage
This can be used after you have created a sprite for your game. It should be used if you need to send the height of your sprite.
# Examples
### Example 1
```
//File code/client/src/game.js
create() {
	g.sendCharacterSize('players', 0.2);
}
```
