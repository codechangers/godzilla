## 1. Creating item hotbar

This will help create a hotbar for your game like minecraft that lets you see and use different items in your game. To create the hotbar you will start in the **game.js** file. Using the `useItemBar` _function_ in the `init` _method_ we can create this hotbar with the number being the amount of spaces that you want to put items in.
```javascript
init() {
	g.useItemBar(8);
}
```
This allows you to create 8 spots in your item bar to place items.

## 2. Creating the item

Now we need to create the items that the player can use in the **room.js** file. In the **room.js** file we will create the item with the `createNewItem` _function_ in the `onInit` _method_. We can pass in the _item name_, _image name_, and _what you want to happen when you use the item_.
```javascript
onInit() {
	g.createNewItem('pickaxe', 'pickaxe.png', (player, data, actions) => {
		actions.swingItem();
	})
}
```
This would swing the item when this item is used.

## 3. Adding the item to the hotbar
Once we have created the item we need to choose which items to add to which players hotbar. In this example we will add it to the players hotbar when the game starts, but you can add it at anytime during the game. To add it on start we will use the `addItemToCharacter` _function_ in the **room.js** file inside of the `onJoin` _method_.
```javascript
onJoin(client,data) {
	const  player = g.getACharacter('players', client.sessionId);
	g.addItemToCharacter(player, 'pickaxe');
}
```
This gets the player that joined and adds the _pickaxe_ item that we created to their hotbar.
## 4. Attaching items to character
After adding the item to the hotbar we can also attach it to the player. First we need to add the image of the item to our game in the **game.js** file with the `loadImage` _function_ inside of the `preload` _method_. 
```javascript
preload() {
	g.loadImage('pickaxe', 'pickaxe.png');
}
```

Then we will go back to the **room.js** and attach it to the player with the `attachTo` _function_. If we add this _function_ in the `onJoin` _method_ we can attach this item to the character so he is holding it as he moves along. To do this we tell the function which _item to attach_, _how far right to move it from the center of the player_, _how far down to move it_, and _how big it should be on the player_.
```javascript
onJoin(client,data) {
	...
	g.attachTo('players', client.sessionId, {item:g.getItem('pickaxe'), x:-50, y:-100, scale:0.5});
}
```
