# canSend()

This method will tell you if player joined the game and is ready to send messages to the server
​

## Parameters

**none**
​

## Returns

boolean value (true/false)
​

## Usage

This method should be used in order to see if a player has successfully joined the chatroom before sending actions.

# Examples

### Example 1

```
//File code/client/src/game.js
​
update() {
	if (g.canSend()) {
		...
	}
}
```
