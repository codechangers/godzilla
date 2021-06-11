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
		click: () => {
			const bulletSpeed = 500;
			const bulletDuration = 2000;
			const index = g.nextCharacterId('bullets');
			g.createACharacter('bullets', index, { x: player.x, y: player.y, playerId: player.id });
			let newCharacter = g.getACharacter('bullets', index);
			g.playAnimation(newCharacter, 'x',
				g.getXTowards(newCharacter, data.x, data.y) * bulletSpeed, bulletDuration);
			g.playAnimation(newCharacter, 'y',
				g.getYTowards(newCharacter, data.x, data.y) * bulletSpeed, bulletDuration);
			setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), bulletDuration);
		},/*[*/
		mousemove: () => {
			player.rotation = g.getRotationTowards(player, data.x, data.y);
		},/*]*/
	};
	g.handleActions(actions, data);
}
```

Inside of the brackets in our `mousemove` action has the code to change the rotation of our player to follow the mouse.

Now our player will always be facing towards the direction of our mouse.
