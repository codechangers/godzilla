---
title: useLoginScreen()
tags: [customize]
author: jason
---
This method will show an interactive login screen when a player first joins, so they can login to your game.
## Parameters
**onStart**: `function` - What to do when they click the button.<br><br>
​
**title**:`string` - What the header should say.<br><br>
​
**input**:`string` - What the input should say.<br><br>
​
**button**:`string` - What the button should say.
## Returns
**Nothing**
## Usage
This method should be used if you want players to be able to login to your game. For example, if you think players should have display names when they join your server.
# Examples
### Example 1
```
//File code/client/src/game.js
create() {
	g.useLoginScreen(() => console.log("LOGIN"), 'FUN GAME', 'Username', 'Start!');
}
```
