# follow()

This method will have one type of character or resource follow another type.
​

## Parameters

​
**type1**: `string` - The type of character or resource that will be followed, ie. players, wizards, knights.

**type2**: `string` - The type of character or resources that will follow the type1 character, ie. enemies, pets, resources.

**range**: `number` - How close the followers can get to the character being followed.

**speed**: `number` - The rate of speed the followers move at, ie. 0.5 for half speed, 2 for double speed.

## Returns

**Nothing**
​

## Usage

​
This method should be used in the `onUpdate`. It can be used as long as you have created the characters or resources to use it with. It can be used anytime you need one character or resource to follow another character or resource.
​

## Examples

### Examples 1

```
// File: code/server/rooms/room.js
onUpdate() {
	...
	g.follow('players', 'goblins', 50, 0.5);
}
```

### Examples 2

```
// File: code/server/rooms/room.js
onUpdate() {
	...
	g.follow('fish', 'sharks', 10, 0.8);
}
```
