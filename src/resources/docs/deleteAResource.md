# deleteAResource()

Delete an instance of a resource from your game.

## Parameters

**type**: `string` - The type of resource that. you'd like to delete.

**id**: `number` - The id of the resource.

## Returns

**Nothing**

## Usage

You can use this method after you have created a resource somewhere on the map. You should use it anytime you need a resource to be deleted from your game.

# Examples

### Example 1

```
//Link code/server/rooms/room.js
​
onMessage(client, data) {
	...
	g.deleteAResource('trees', tree.id);
}
```
