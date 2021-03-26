---
title: useStore()
tags: [customize]
---
This method can be used to show a store interface for selling items.

## Parameters
**title**: `string` - What the header should say. 

**items**: `array` - What items are for sale? ie. [sword, ice-cream, fly swatter]
## Returns
**Nothing**
## Usage
You should use this once you have set up at least one store item for your store.
## Examples
### 1.
```
// File: code/client/src/game.js
create() {
	g.useStore('Supa Store', [
		new  g.StoreItem(
			'pickaxe.png',
			'Pickaxe',
			'stone',
			50,
			'createPickaxe'
		),
		new  g.StoreItem(
			'star.png',
			'Star',
			'Points',
			15,
			'addStar'
		),
	]);
}
```
