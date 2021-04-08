# 8. Add Blocks

Step (2/3) To add blocks to your game.

##### 2. in `game.js`, Add `StoreItem`'s inside the `useStore` function.

```javascript
// File: code/client/src/game.js
// Copy
<<<<<<< HEAD
		new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
		new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5'),
=======
new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5'),
>>>>>>> fa7d7d93150f6a5493d35bea168bbdb1a0bdc6e8
// End Copy
	g.useStore('The Store', [
		/*{*/// Add Store Items here!/*}[*/new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
		new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5'),/*]*/
	]);
```
