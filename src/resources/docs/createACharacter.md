# createACharacter()

This method will create a character instance. This means a new custom character will be spawned into the game.

## Parameters

**type**: `string` - The type of characters to get, ie. player, wizards, goblins.

**id**: `string` - A unique character id, ie. player1, player2, goblin3.

**data**: `object` - The character data. This should contain important information like the character's position.
​

## Returns

**Nothing**
​

## Usage

This method can be used anywhere except the `onLeave` method. Here are a few cases you might consider when picking where to put your `createACharacter` call:

1. Should this character be created before any players join? - `onInit`
2. Should this character be created each time a player joins? - `onJoin`
3. Should this character be created when something specific happens in the game? - `onMessage`
4. Should this character be created over and over all the time? - `onUpdate`
   ​

## Examples

### Example 1

```
// File: code/server/rooms/room.js
onInit() {
	...
	g.createACharacter('goblins',
		g.nextCharacterId('goblins'),
		{ x: 500, y: 500 });
}
```

### Example 2

```
// File: code/server/rooms/room.js
onJoin(client, data) {
	...
	g.createACharacter('players', client.sessionId, data);
}
```

### Example 3

```
// File: code/server/rooms/room.js
onMessage(client, data) {
	...
	const actions = {
		...
		createWizzard: () =>
			g.createACharacter('wizzards',
				g.nextCharacterId('wizzards'), data),
	};
	g.handleActions(actions, data);
}
```
