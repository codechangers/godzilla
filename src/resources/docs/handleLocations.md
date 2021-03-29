# handleLocations()

This method is used to set the rules of all the locations in action.

## Parameters

**locationType**: `string` - The type of location.

**characterType**: `string` - The type of character to be affected by locations.

## Returns

**Nothing**

## Usage

This method can be used after creating locations in your game. You should use this in order to apply the rules of the locations, and to choose which type of character to be affected by locations.

# Examples

### Example 1

```
//File code/server/rooms/room.js
onUpdate() {
	g.handleLocations('safeZones');
}
```
