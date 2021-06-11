# Zombie Game - 4.F

## Add shooting to the game.

**(Step 6/10)** Create a new action called click!

### Create the click action.

In `room.js`, we need to add a new _value_ to our `actions` _object_ inside the `onMessage` _method_.

``` javascript
// File: room.js
// Copy
click: () => {},
// End Copy
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	const speed = 10;
	const actions = {
		moveUp: () => g.move(player, 'y', -speed),
		moveDown: () => g.move(player, 'y', speed),
		moveLeft: () => g.move(player, 'x', -speed),
		moveRight: () => g.move(player, 'x', speed),/*[*/
		click: () => {},/*]*/
	};
	g.handleActions(actions, data);
}
```
