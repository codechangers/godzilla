# addItemToCharacter()

This method allows users to create an item to a specific characters hot bar which will then allow them to use that item.

## Parameters

**character** `object` - The character that will have access to the item

**type** `string` - The type of item to add

**uses** `number` - amount of times you can use this item.

## Returns

**Nothing**

## Usage

This method can be used after you have a defined item in your game. You should use this method if you want your character to be able to access that item.

## Examples

### 1.

```
//Link code/server/rooms/room.js
onJoin(client, data) {
	const  player = g.getACharacter('players', client.sessionId);
	g.addItemToCharacter(player, 'pickaxe');
}
```
