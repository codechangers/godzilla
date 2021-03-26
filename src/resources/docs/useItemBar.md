---
title: useItemBar()
tags: [customize]
---
This method allows users to create an in game item bar for displaying a characters equipped items.
## Parameter
**itemAmount**: `number` - The number of items slots on the item bar.
## Returns
**Nothing**
## Usage
You can use this method to display the item bar with a custom amount of item spaces.
## Examples
### 1.
```
//Link code/client/src/game.js
init() {
	g.useItemBar(8);
}
```
