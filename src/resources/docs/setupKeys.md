---
title: setupKeys()
tags: [customize]
author: jason
---
This method will get your game to start listening to when you push a key on the keyboard.
## Parameters
**keys**: `object` - phaser [key codes](/keycodes)
## Returns
**Nothing**
## Usage
Use this method when you need to start using the keyboard in your game to complete actions.
# Examples
### Example 1
```
//File code/client/src/game.js
create() {
	g.connect();
	g.setupKeys(keys);
}
```
