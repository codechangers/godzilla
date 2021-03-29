# handleCollision()

this method will check for collision between two different objects in your game, and run a function when a collision is detected.
​

## Parameters

**typeA**: `string/object` - The first type of object (string), if you want to check all of one type of object, ie. enemies. OR a single object instance (object) if you only need to check a single object, ie. sword.

**typeB**: `string/object` - The second type of object (string) OR a single object instance (object).

**callback**: `function` - A function telling what to do if a collision is detected.

## Returns

**nothing**
​

## Usage

​
This method can be used after you have created at least two objects in your game and a callback function created as well. It should be used when you want to have an action take place when two objects collide.

## Examples

### Example 1

```
//Link code/server/rooms/room.js
onUpdate() {
g.handleCollision('players', 'zombie', player => player.healthBar.filled -= .5);
}

```
