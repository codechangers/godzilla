# getItemPosition()

This method allows users to get the absolute position of an item that is attached to a character in the game.

## Parameters

**character**: `obj` - The character instance.
​

## Returns

**position**: `obj {x, y}` - An object of the absolute x and y position of the item.

## Usage

This method allows to get the absolute position of the item that the character/resource has attached to it.

## Examples

### 1.

```
/Link code/server/rooms/room.js
onMessage(client, data) {
	const  player = g.getACharacter('players', client.sessionId);
	const  actions = {
		click: () =>  {
			let itemPosition = g.getItemPosition(player);
			g.createACharacter('brokenRock', g.nextCharacterId('brokenRock'), {x: itemPosition.x, y: itemPosition.y);
		}
	}
	g.handleActions(actions, data);
}
```
