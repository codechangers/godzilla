# addConnectEvent()

This method will set up a function call to run as soon as the server is connected. (This is intended for more advanced users)
​

## Parameters

**funcName**: `string` - The name of the library function that you want to run.

**params**: `array` - The parameters that need to be be passed into the function that's being called.

## Returns

**Nothing**
​

## Usage

This method will be used as soon as the server is connected. You should use this method if you want any function to be called as soon as the player joins the game.
​

## Examples

​

### Example 1

```
// File: code/client/src/game.js
​
create() {
	...
	g.addConnectEvent('getResources', [type, onAdd]);
}
```
