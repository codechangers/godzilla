# createAResource()

This method will create one resource in a specific spot on the map.

## Parameters

**type**: `string` - The type of resource you'd like to create.

**x**: `number` - The x position of your resource on the board.

**y**: `number` - The y position of your resource on the board.

## Returns

**Nothing**

## Usage

You can use this method after you have defined a type of resource. You should use it when you are ready to create a resource somewhere on the map.

# Examples

### Example 1

```
//File code/server/rooms/room.js
​
onInit() {
	...
	g.createAResource('trees', 50, 100);
}
```
