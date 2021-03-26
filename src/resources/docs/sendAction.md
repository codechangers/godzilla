---
title: sendAction()
tags: [customize]
author: jason
---
This method will send an action command to the server. This will be used for any action's you want to take place in the game.
​
## Parameters
**action**: `string` - The action you want to send to the server.<br><br>
​
**data**: `object` - Anything you need to send to the backend.
​
## Returns
**Nothing**
​
## Usage
This method can be Used at anytime, it should be used anytime you want an action to take place in the game.
# Examples
### Example 1
```
//File code/client/src/game.js
​
update() {
	if (g.canSend()) {
		const { up, down, left, right, w, a, s, d, space } = g.getKeysDown();
		if (up || w) g.sendAction('moveUp');
	}
}
```
### Example 2
```
//File code/client/src/game.js
​
update() {
	if (g.canSend()) {
		const { up, down, left, right, w, a, s, d, space } = g.getKeysDown();
		if (up || w) g.sendAction('moveUp', {y: 50, fast:true});
	}
}
```
