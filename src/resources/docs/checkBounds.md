# checkBounds()

This method will check to see if a character will run into the game boundaries on movement.

## parameters

**object**: `object` - The object you are checking for.

**axis**: `string` - The axis that the object is moving on (x or y).

**distance**: `number` - The distance the object is moving on that axis.

## Returns

**{ validMove, fallbackPos }** - Tells you if the move is valid, and if not, will provide a fallback position for your object.

## Usage

This method can be used once you have bounds set for your game and have created at least one character with movement. It should be used to stop characters from moving through the game boundaries.

# Examples

### Example 1

```
//File code/server/rooms/room.js
​
onMessage(client, data) {
	const  player = g.getACharacter('players', client.sessionId);
	const actions = {
		moveUp: () => {
			let newMove = g.checkBounds(player, 'y', -speed);
			if (newMove.validMove) {
				player.y -= speed;
			} else {
				player.y = newMove.fallbackPos;
			}
		}
	};
	g.handleActions(actions, data);
}
```
