# Zombie Game - 6.B

## Add character rotation.

**(Step 2/2)** Add the _mousemove_ action to the server.

### Add mouse move action.

In `room.js`, we need to add a `mousemove` _action_ to our `actions` _object_ in the `onMessage` _method_.

```javascript
// File: room.js
// Copy
mousemove: () => {
				player.rotation = g.getRotationTowards(player, data.x, data.y);
			},
// End Copy
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	const speed = 10;
	const actions = {
		moveUp: () => g.move(player, 'y', -speed),
		moveDown: () => g.move(player, 'y', speed),
		moveLeft: () => g.move(player, 'x', -speed),
		moveRight: () => g.move(player, 'x', speed),
		click: () => this.shootBullet(player, data),/*[*/
		mousemove: () => {
			player.rotation = g.getRotationTowards(player, data.x, data.y);
		},/*]*/
	};
	g.handleActions(actions, data);
}
```

Inside of the brackets in our `mousemove` action has the code to change the rotation of our player to follow the mouse.

Now our player will always be facing towards the direction of our mouse.
