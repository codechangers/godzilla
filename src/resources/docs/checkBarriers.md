# checkBarriers()

This method will check if when a character moves they will run into a barrier.

## Parameters

**object**: `object` - The game object you want to move.

**axis**: `string` - x or y axis of movement.

**distance**: `number` - How far you want to move along the given axis.

## Returns

**{ validMove, fallbackPos }** - This tells if the move is valid, and if not, gives the character a fallback position to move to instead.

## Usage

You should use this method when trying to set up Character interaction with barriers, in order to check and see when they run into one.
​

# Examples

### Example 1

```
File code/server/rooms/room.js
​
onMessage(client, data) {
	const  player = g.getACharacter('players', client.sessionId);
	const actions = {
		moveUp: () => {
			let newMove = g.checkBarriers(player, 'y', -speed);
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
