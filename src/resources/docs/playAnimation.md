---
title: playAnimation()
tags: [customize]
---
This method allows you to create an animation on anything that you want to change over a certain time.
## Parameters
**obj**: `obj` - The character/resource instance.<br><br>
​
**attribute**: `string` - The attribute you want to animate e.g. x, y, rotation or anything else.<br><br>
​
**value**: `number` - The value the attribute should be changed by.<br><br>
​
**duration**: `number` - (milliseconds) how long the animation should run.
​
## Returns
**Nothing**
## Usage
You can use this method to change a character or resources attributes like x, y, or rotation by a certain amount every certain amount of time to make it look like it is moving.
# Examples
### Example 1
```
//Link code/server/rooms/room.js
​
onJoin(client) {
	const player = g.getACharacter('players', client.sessionId);
	g.playAnimation(player, 'rotation', 1, 1000);
}
```
### Example 2
```
//Link code/server/rooms/room.js
​
onJoin(client) {
	const player = g.getACharacter('players', client.sessionId);
	g.playAnimation(player, 'x', 5, 2000);
}
```
