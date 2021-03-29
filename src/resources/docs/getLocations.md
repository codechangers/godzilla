# getLocations()

# getLocations

This method will allow you to keep track of all your created locations on the server.

## Parameters

**type**: `string` - The type of location.

**onAdd**: `function` - This will run when a location is added.

**onRemove**: `function` - This will run when a location is removed.

**onUpdate**: `function` - This will run when a location is updated.

## Returns

**Nothing**

## Usage

You can use this method after you have defined at least one location type. Use this method to keep track of all your locations.

# Examples

### Example 1

```
// File: code/client/src/game.js
create() {
	...
	g.getLocations('safeZone');
}
```

### Example 2

​

```
// File: code/client/src/game.js
create() {
	...
	function onAdd(location, data) {
		console.log('SafeZone ' + data.id + ' was added!');
	}
	function onRemove(id) {
		console.log('SafeZone ' + id + ' was removed!');
	}
	function onUpdate(id, attr, value) {
		console.log(this.safeZones[id].name + "\'s " + attr + ' changed to ' + value + '!');
	}
	g.getLocations('safeZones', onAdd, onRemove, onUpdate);
}
```

### Example 3

​

```
// File: code/client/src/game.js
create() {
	...
	g.getLocations(
		'safeZones',
		(safeZone, data) => {
			safeZone.sprite.depth = 1;
		}, // onAdd
		(id) => console.log(`SafeZone ${id} deleted!`), // onRemove
		(id, attr, value) => {
			if (attr == 'grow' && value) {
				console.log('Change Size');
			}
		} // onUpdate
	);
}
```
