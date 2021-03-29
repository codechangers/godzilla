# getResources()

This method will get and keep track of the current amount of resources you have

## parameters

**type**: `string` - the type of resources that you want to get.

**onAdd**: `function` - This will run when a resource is added.

**onRemove** : `function` - This will run when a resource is removed.

**onUpdate**: `function` - This will run when a resource is updated.

## Returns

**Nothing**

## Usage

This method can be used at any time. You should use this method anytime you want to see how many resources of a certain type you have.

## Examples

### 1.

```

// File: code/client/src/game.js
create() {
	...
	g.getResources('trees');
}
```

### 2.

```
// File: code/client/src/game.js
create() {
	...
	function onAdd(resource, data) {
		console.log('Tree ' + data.id + ' was added!');
	}
	function onRemove(id) {
		console.log('Tree ' + id + ' was removed!');
	}
	function onUpdate(id, attr, value) {
		console.log(this.trees[id].name + "\'s " + attr + ' changed to ' + value + '!');
	}
	g.getResources('trees', onAdd, onRemove, onUpdate);
}
```
