# getKeysDown()

This method will get the current keyboard inputs for the game.
​

## Parameters

**none**

## Returns

**keysdown** - The keys that are currently being pressed.

## Usage

This should be used when you need to get key inputs in order to complete actions in the game.

# Examples

### Example 1

```
//Link code/client/src/game.js
​
update() {
	if (g.canSend()) {
		const {up, left, a, w, s} = g.getKeysDown();
		if (up) g.sendAction('moveUp');
	}
}
```
