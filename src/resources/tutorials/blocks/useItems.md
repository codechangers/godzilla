## 1. Using the item

After creating your item and attaching it to the player we can now use the item by using the `useItem` _function_ in the **room.js** file. For this example we will use their item when they click which you can review in the events tutorial.
```javascript
onMessage(client, data) {
	const  player = g.getACharacter('players', client.sessionId);
	const  actions = {
		click: () =>  g.useItem(player),
	}
	g.handleActions(actions, data);
}
```
This example will use the players item that is selected when they clicked.

## 2. Switching Items

In order to switch the item that the player is holding you will need to use the `switchItem` _function_ in the **room.js** file. For this example we will switch items when space is pressed again review events.
```javascript
onMessage(client, data) {
	const  player = g.getACharacter('players', client.sessionId);
	const  actions = {
		click: () =>  g.useItem(player),
		space: () => g.switchItem(player),
	}
	g.handleActions(actions, data);
}
```
This would switch the item to the next available item when space is pressed.

## 3. Using Actions
After doing all of this it should work fine, but if you want to use the built in _functions_ for items of _swingItem_, _throwItem_, or _placeItem_ there is a couple more steps.

First since we will be moving them we need to make sure they have the same ability to move as the characters so we will add them as characters in the **game.js** file inside of the `init` _method_
```javascript
init() {
	g.addCharacters('pickaxe');
}
```
Then we need to make sure we are getting the _items_ every time they are changed or moved in the `create` _method_.
```javascript
create() {
	g.getCharacters('pickaxe');
}
```
Now inside of the `createNewItem` _function_ you made in the **room.js** file you will be able to throw the item, place the item, or swing the item Ex:
```javascript
onInit() {
	g.createNewItem('pickaxe', 'pickaxe.png', (player, data, actions) => {
		actions.swingItem();
		*or*
		actions.throwItem(data.x, data.y);
		*or*
		actions.placeItem();
	})
}
```

Lastly to make sure the items move when you use _throwItem_ you would have to make sure and handle the animation with the `handleAnimations` _function_ inside of the **room.js** file inside of the `onUpdate` _method_.
```javascript
onUpdate() {
	g.handleAnimations('pickaxe');
}
```

