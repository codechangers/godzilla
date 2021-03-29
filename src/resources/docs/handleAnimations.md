# handleAnimations()

This method allows you to check and run all animations on certain characters and resources that are using animations.

## Parameters

**type**: `string` - The type of character/resource

## Returns

**Nothing**

## Usage

Make sure to use this method in your onUpdate function if you are animating, throwing, or swinging anything. This will make sure the animations are running for your resources, characters, and items.

# Examples

### Example 1

```
//Link code/server/rooms/room.js
​
onUpdate() {
	g.handleAnimations('players');
	g.handleAnimations('trees');
	...
}
```
