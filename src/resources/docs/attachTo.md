# attachTo()

This method will attach a single item, bar, or text field to a character or resource. This can be used to create health bars, name tags, and allow characters to hold items.

## Parameters

**type**: `string` - The type of characters/resources to get, ie. player, wizards, goblins.<br><br>
​
**id**: `string` - A unique character/resource id, ie. player1, player2, goblin3.<br><br>
​
**data**: `object` - The attachment data. This should contain the configuration options for the attachment.
​

## Returns

**Nothing**
​

## Usage

This method must be called after at least one character has been created. The `data` parameter must consist of the following attributes:

- **name**: `string` - The name of the attachment. (Can be anything)
- **x**: `number` - The x position offset of the attachment, ie. -100 if you want the item to be left of center, and 100 if you want the item to be right of center.
- **y**: `number` - The y position offset of the attachment, ie. -100 if you want the item to be above center, and 100 if you want the item to be below center.
- **scale**: `number` - The scale of the item image, ie. 0.5 for half size.
- **type**: `string` - The type of attachment, options: `item`, `bar`, or `text`.
- **image**: `string` - The name of the loaded item image. **Only include if type is `item`**
- **text**: `string` - The text to attach to the character, ie. bobby, john, wizard. **Only include if type is `text`**
- **filled**: `number` - The amount of bar filled. Values can range from `0` to `100` where `0` is an empty bar and `100` is a full bar. **Only include if type is `bar`**
  ​

## Examples

### Example 1

```
// File: code/server/rooms/room.js
onJoin(client, data) {
	...
	g.attachTo('enemies', client.sessionId,{
		name: 'nameTag',
		x: 0,
		y: -60,
		type: 'text',
		text: 'Im a bad guy!'
	});
}
```

### Example 2

```
// File: code/server/rooms/room.js
onJoin(client, data) {
	...
	g.attachTo('heros', client.sessionId,{
		name: 'healthBar',
		x: 0,
		y: 60,
		type: 'bar',
		filled: 100
	});
}
```

### Example 3

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
