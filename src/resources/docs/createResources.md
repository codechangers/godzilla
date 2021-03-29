# createResources()

Creates resources around the map

## Parameters

**type** `string` - The type of resource you'd like to create.

**amount** `int` - The amount of resources you want to create on the map.

## Returns

**Nothing**

## Usage

You can use this method after you have defined a type of resource. You should use it when you want to spawn resources randomly around the map.

# Examples

### Example 1

```
//File code/server/rooms/room.js
​
onInit() {
	...
	g.createResources('trees', 100);
}
```
