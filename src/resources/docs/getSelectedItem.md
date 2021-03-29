# getSelectedItem()

This method allows users to get a specific character's currently selected item.

## Parameters

**character**: `obj` - The character instance.
​

## Returns

**item**: `obj` - The object instance.

## Usage

Used to get the item that is selected in the item bar.

# Examples

### Example 1

```
//Link code/server/rooms/room.js
​
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	let item = g.getSelectedItem(player);
	...
}
```
