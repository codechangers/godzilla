# getRotationTowards()

This method will return the rotation needed to rotate your character/resource towards a certain point on the screen.

## Parameters

**character**: `object` - The character you want to rotate.

**x**: `number` - The x value that you want to rotate towards.

**y**: `number` - The y value that you want to rotate towards.

## Returns

**a number** - The amount of rotation needed to rotate the character towards the given point.

## Usage

You can use this method once you have created a character or resource in your game. You should use it to get the character to rotate towards another character, or towards the mouse, or an end point etc.

## Examples

### 1.

```
// File: code/server/rooms/room.js
onUpdate(){
	player.rotation = g.getRotationTowards(player, 500, 500);
}
```
