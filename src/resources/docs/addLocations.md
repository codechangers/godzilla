# addLocations()

This method will initialize the locations client feature, allowing you to create certain areas, or locations around the map.

## Parameters

**type**: `string` - The type of locations.

**scale**: `number` - The scale of the sprite, ie. 0.5 for half size.

## Returns

**Nothing**

## Usage

You should use this if you want to create custom locations around your map, for example, safe zones, check points, or even hazardous areas that drain your health or speed.
​

# Examples

### Example 1

```
//File code/client/src/game.js
​
init() {
	...
	g.addLocations('safeZone');
}
```

### Example 2

```
//File code/client/src/game.js
​
init() {
	...
	g.addLocations('fireZone', 0.5);
}
```
