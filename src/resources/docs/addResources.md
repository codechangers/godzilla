# addResources()

This method will create a new set of resources for your game

## parameters

**type**: `string` - the type of resources that you want to add to the game.

## Returns

**Nothing**

## Usage

This method can be used at any time. You should use this method anytime you want to add a new type of resource to your game.
​

# Examples

### Example 1

```
File code/client/src/game.js
​
init() {
	...
	g.addResources('trees');
}
```
