---
title: StoreItem()
tags: [customize]
---
This is a data type for items that are for sale in the in game store. You would only use this inside of the useStore function to create the store items. 

## Parameters
**image** : `string` - The relative path to an image.

**name** : `string` -  The name of the item.

**costAttr** : `string` - What customers  use to pay with, this could be a resource.

**cost** : `string` - How much customers pay.

**action** : `string` - The server action for buying the item. This needs to match the same action that you put on the server. 

## Examples
### Example 1
```
new g.StoreItem(
	'pickaxe.png',
	'Pickaxe',
	'stone',
	50,
	'createPickaxe'
)
```
