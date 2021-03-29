# handleItemCollsion()

This method checks for collision between a character held item and another character or resource

## Parameters

**characterType**: `string` - The first character/resource type.

**itemName**: `string` - The name of the item that is attached.

**objectType**: `string` - The collision character/resource type.

**callback**: `function` - The function that runs when the object is hit by the item.

## Returns

**Nothing**

## Usage

This method is used in the onUpdate to check for collision with an item that you would swing and another character/resource and allows you to do something if it hits.

# Examples

### Example 1

```
//Link code/server/rooms/room.js
​
onUpdate() {
	g.handleItemCollision('players', 'pickaxe', 'trees', (players, trees) => {
		g.deleteAResource('trees', trees.id);
	});
}
```
