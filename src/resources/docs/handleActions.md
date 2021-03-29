# handleActions()

This method will handle all the action messages sent in through the client side.
​

## Parameters

**actions**: `object` - The action functions that were sent in.

**data**: `object` - The data from the message that was sent in.

## Returns

​
**Nothing**
​

## Usage

This method should be set up in room.js to receive all the action messages from game.js and run them when the message is sent.

# Examples

### Example 1

```
//File code/server/rooms/room.js
onMessage(client, data) {
	const actions = {
		moveUp: () => console.log("Move Up")
	}
	g.handleActions(actions, data);
}
```
