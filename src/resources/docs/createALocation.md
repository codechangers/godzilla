# createALocation()

Create a location with a defined size which follows a custom set of rules.

## Parameters

**type**: `string` - The type of locations.

**id**: `string` - A unique location id.

**dims**: `object` - Dimension values x, y, width, and height.

**color**: `string` - The color of the location as a hex value. e.g. "125242"

**rules**: `function` - a function telling what happens when someone is in this location.

## Returns

**Nothing**

## Usage

You can use this function after you have initialized the locations feature on both your client side and your server side. You should use this feature in order to create custom locations, anywhere you want on your game map.

# Examples

### Example 1

```
//File code/server/rooms/room.js
​
onInit() {
	...
	g.createALocation('safeZone', g.nextLocationId('fireZone'), {x: 50, y: 50, width: 20, height: 100}, '993311', character => {
		character.health.filled -= 1;
	});
}
```
