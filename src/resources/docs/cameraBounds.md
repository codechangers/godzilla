# cameraBounds()

This method will create a set area for the camera that it cannot leave.
​

## Parameters

**width**: `this.game.width` - The width of the area the camera is bound to.<br><br>
​
**height**: `this.game.height` - The height of the area the camera is bound to.

## Returns

**Nothing**

## Usage

This should be used when you want to set bounds for your camera, so you'll only be able to see a certain area.
​

# Examples

### Example 1

```
File code/client/src/game.js
​
init() {
	...
	g.cameraBounds();
}
```

### Example 2

```
File code/client/src/game.js
​
init() {
	...
	g.cameraBounds(1000, 1000);
}
```
