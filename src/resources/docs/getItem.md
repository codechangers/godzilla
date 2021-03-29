# getItem()

This method allows users to remove an item from a specific character's item bar. This can be used to take away functionality or reset in game events.

## Parameters

**type**: `string` - The type of the item.
​

## Returns

**item**: `item` - The item instance.

## Usage

This method allows users to get a specific item instance.

# Examples

### Example 1

```
//Link code/server/rooms/room.js
​
onMessage(client, data) {
	let newItem = g.getItem('sword');
	...
}
```
