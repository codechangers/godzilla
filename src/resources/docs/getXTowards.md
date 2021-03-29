# getXTowards()

This method will calculate the change in x needed to move a character closer to a point.

## Parameters

**character**: `object` - The character you want to rotate.

**x**: `number` - The x value that you want to move towards.

**y**: `number` - The y value that you want to move towards.

## Returns

**A Number** If you continue to move the character this amount of x, it will move towards the given point.

## Usage

You can use this method once you have a character or resource set up in your game. You should use it along with the getYTowards method in order to move a character towards a certain point.

## Examples

### 1.

```
// File: code/server/rooms/room.js
onMessage(){
	click: () => {
		g.playAnimation(player, 'x', g.getXTowards(player, 500, 500) * 500, 2000);
		g.playAnimation(player, 'y', g.getYTowards(player, 500, 500) * 500, 2000);
	}
}
```
