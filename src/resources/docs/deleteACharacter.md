# deleteACharacter()

This method will delete a character instance. This means a character will be taken out of the game.

## Parameters

**type**: `string` - The type of characters to get, ie. player, wizards, goblins.

**id**: `string` - A unique character id, ie. player1, player2, goblin3.
​

## Returns

**Nothing**
​

## Usage

This method is intended to be used inside the `onLeave` method. But can be used in other methods as well.
​

## Examples

### Example 1

```
// File: code/server/rooms/room.js
onLeave(client) {
	...
	g.deleteACharacter('players', client.sessionId);
}
```

### Example 2

```
// File: code/server/rooms/room.js
onUpdate() {
	...
	g.handleCollision('players', 'badGuys', (player) => {
		g.deleteACharacter('players', player.id);
	});
}
```
