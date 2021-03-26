---
title: unAttach()
tags: [customize]
---
[ *This is a `room.js` method.*  ] This method will remove a single item, bar, or text field from a character or resource.
​
## Parameters
**type**: `string` - The type of characters/resource you want to unattach something from, ie. player, wizards, goblins.<br><br>
​
**id**: `string` -  The unique character/resource id you want to unattach something from, ie. player1, player2, goblin3.<br><br>
​
**name**: `string` - The name of  the character/resource you want to unattach, ie. healthBar, nameTag, sword.
​
## Returns
**Nothing**
​
## Usage
This method must be called after at least one  item has been attached to a character that you have created. You should use this function when you want to give your character unique features, ie. weapons, props, name tags, health bars etc.
​
## Examples
### Example 1
```
// File: code/server/rooms/room.js
onLeave(client) {
	g.unAttach('goblins', client.sessionId, 'club');
	...
}
```
### Example 2
```
// File: code/server/rooms/room.js
onMessage(client, data) {
	...
	const  actions = {
		...
		attachItem1: () => {
			g.attachTo('players', client.sessionId, {
				name: 'item1',
				x: 50,
				y: 50,
				type: 'item',
				image: 'item1'
				scale: 0.5,
			});
			g.unAttach('players', client.sessionId, 'item2');
		},
		attachItem2: () => {
			g.attachTo('players', client.sessionId, {
				name: 'item2',
				x: 50,
				y: 50,
				type: 'item',
				image: 'item2'
				scale: 0.5,
			})
			g.unAttach('players', client.sessionId, 'item1');
		},
	};
	g.handleActions(actions, data);
}
```
Collapse
