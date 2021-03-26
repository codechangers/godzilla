---
title: toggleStore()
tags: [customize]
---
This method can be used to turn on and off your store interface. 
## Parameters
**none**
## Returns
**Nothing**
## Usage
This method can be used after you have implemented the useStore method, it should be used in order to toggle your store interface on and off. 
## Examples
### 1.
```
//File: code/client/src/game.js
click() {
	g.toggleStore();
}
```
### 2.
```
// File: code/client/src/game.js
update() {
	if (g.canSend()) {
		const { tab } = g.getKeysDown();
		if (tab) g.toggleStore();
	}
}
```
