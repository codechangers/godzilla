# getACharacter()

This method will get a character instance from the game state. Allowing you to then modify or review that character's data.
​

## Parameters

**type**: `string` - The type of characters to get, ie. player, wizards, goblins.

**id**: `string` - A unique character id, ie. player1, player2, goblin3.

## Returns

**character**: `object` - The character data that was retrieved from the game state.
​

## Usage

This method can be used anywhere, but **MUST** be called with a valid id! To check if your id is valid try using the following code:

> **Note:** replace `{type}` with the type of character and `{id}` with the id you are testing.

```
const idIsValid = {id} in this.state.{type};
// This will equal true if the id is valid.
```

​

## Examples

### Example 1

```
// File: code/server/rooms/room.js
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	...
}
```

### Example 2

```
// File: code/server/rooms/room.js
onUpdate() {
	const id = "skywalker";
	if (id in this.state.jedis) {
		const jedi = g.getACharacter('jedis', id);
	}
	...
}
```
