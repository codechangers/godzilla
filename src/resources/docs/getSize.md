# getSize()

This method will allow you to get the size of an object in the server.

## Parameters

**type**: `string` - The type of object you want the size of.

## Returns

**s** - An object, the width and height of the character or resource. ie. {width: 12, height: 12}

## Usage

You can use this method as soon as you have a character or resource set up in your game. Your should use it if you need to get the size of an object on the server side.

## Examples

### 1.

```
// File: code/server/rooms/room.js
onJoin{
	g.getSize('players');
}
```
