# getCharacters()

Listen to Characters on the server. This will get live updates from the server about the characters in the game. When one is created, deleted, or updated!

## Parameters

**type**: `string` - The type of characters to get, ie. player, wizards, goblins.

**onAdd**: `function` - Code that is run when a character is added.

**onRemove**: `function` - Code that is run when a character is removed.

**onUpdate**: `function` - Code that is run when an existing character is updated.

## Returns

**Nothing**
​

## Usage

This method should only be called in the `create` method of the `game.js` file. The callback function `onAdd`, `onRemove`, and `onUpdate` are optional but must be called in the correct order. `onAdd` functions will receive a character `object` and data `object` as parameters:

```
function onAdd(character, data) {}
```

`onRemove` functions will receive an id `string` as a parameter:

```
function onRemove(id) {}
```

`onUpdate` functions will receive an id `string`, attribute `string`, and value `object` as parameters:

```
function onUpdate(id, attribute, value) {}
```

​

## Examples

### Example 1

```
// File: code/client/src/game.js
create() {
	...
	g.getCharacters('goblins');
}
```

### Example 2

```
// File: code/client/src/game.js
create() {
	...
	function onAdd(character, data) {
		console.log('Hero ' + data.id + ' was added!');
	}
	function onRemove(id) {
		console.log('Hero ' + id + ' was removed!');
	}
	function onUpdate(id, attr, value) {
		console.log(this.heros[id].name + "\'s " + attr + ' changed to ' + value + '!');
	}
	g.getCharacters('heros', onAdd, onRemove, onUpdate);
}
```

### Example 3

```
// File: code/client/src/game.js
create() {
	...
	g.getCharacters(
		'players',
		(player, data) => {
			player.sprite.depth = 1;
			if (player.id == g.myId()) {
				g.cameraFollow(player.sprite);
			}
		}, // onAdd
		(id) => console.log(`Goodbye ${id}!`), // onRemove
		(id, attr, value) => {
			if (id == g.myId() && attr == 'gameOver' && value) {
				location.reload();
			}
		} // onUpdate
	);
}
```
