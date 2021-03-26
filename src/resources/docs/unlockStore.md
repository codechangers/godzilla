---
title: unlockStore()
tags: [customize]
---
This method can be used to unlock the state of your store interface so that it can be toggled again.
## Parameters
**none**
## Returns
**Nothing**
## Usage
This method can be used after you have implemented the useStore method, it should be used in order to toggle your store interface on and off. 
## Examples
### 1.
```
// File: code/client/src/game.js
update() {
	if (g.canSend()) {
		const { tab } = g.getKeysDown();
		if (tab) g.toggleStore();
		else g.unlockStore();
	}
}
```
