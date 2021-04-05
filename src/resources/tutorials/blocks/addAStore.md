## 1. Show the store
In order to create a store for your game you will have to put all of the _items_ in the store with the [useStore](/docs/useStore/) _function_ in the **game.js** file in the `create` _method_. In here you will make a list of items that you want in your store that the players can buy.
```javascript
// Click on: code > client > src > game.js

create() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.useStore('Super Store', [
		new g.StoreItem(	// Your first item.
			'ant.png',			// The image for your item.
			'Little Ant',		// The name of your item.
			'Food',					// Name of the payment.
			10,							// How much it costs.
			'littleAnt'			// The action used to purchase.
		),
		new g.StoreItem( // Your second item.
			'star.png',
			'Star',
			'Points',
			15,
			'star'
		),
	]);
	// End of the new code.
}
```
In each store item you will give the image name, item name, money or resource they need to buy it, price or how much, and the action that will happen if they buy it.

## 2. Opening and closing the store
Now that we have all of the items we want in our store we will have to open, close, and unlock the store with the [toggleStore](/docs/toggleStore/) _function_ and the [unlockStore](/docs/unlockStore/) _function_. Again inside the **game.js** file in the `update` _method_ for this example we are going to toggle it on and off with the tab key.
```javascript
// Click on: code > client > src > game.js

update() {
	// You might have some other code here.
	// Add this new code below your other code:
	if (g.canSend()) {
		const { tab } = g.getKeysDown();
		if (tab) g.toggleStore();
		else g.unlockStore();
	}
	// End of the new code.
}
```
This will make the store open and close when the tab key is pressed as long as you add the tab key into your keys.

## 3. Adding the item when bought
At this point we can use the action you added in the [StoreItem](/docs/StoreItem/) _object_ to add the item that you bought to your item bar.
> **Note:** if you haven't made an item bar yet checkout the [setup items tutorial](/tutorials/blocks/setupItems/).

We will do this in the `onMessage` _method_ in the **room.js** file with the [purchase](/docs/purchase/) _function_.
```javascript
// Click on: code > server > rooms > room.js

onMessage(client, data) {
	// There is probably some code up here.
	const actions = {
		// There might be a little bit more code here.
		// Don't forget to add a comma at the end.
		// Add this new code here:
		littleAnt: () => {
			let prevItems = player['ants'];	
			g.purchase(player, 'score', 5, 'ants');
			if (!prevItems) {
				player['ants'] = 1;
				g.addItemToCharacter(player, 'ants', 1);
			} else  if (prevItems < player['ants']) {
				player.items.ants.uses += 1;
			} else {
				// Not enough money.
			}
		},
		star: () => g.purchase(player, 'score', 15, 'stars'),
		// End of the new code.
	};
}
```
The `littleAnt` action will now add the ant to their hot bar and give them one more use each time they buy it. As long as you have already created the _item_ with [createNewItem](/docs/createNewItem/) _function_.
