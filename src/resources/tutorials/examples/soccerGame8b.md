# Soccer Game - 8.B

## Add blocks to your game.

**(Step 2/3)** Add new store items for each block type.

### Add block store items.

In `game.js` we need to add new `StoreItem` _objects_ to our `useStore` _function_ in the `create` _method_.

```javascript
// File: game.js
// Copy
new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5'),
// End Copy
g.usePlayerSelectScreen({
	blobbert: 'circle1.png',
	grunch: 'circle2.png',
	neon: 'circle3.png',
	nimbo: 'circle4.png',
	tangles: 'circle5.png'
});

g.useStore('The Store', [/*[*/
	new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
	new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5'),
/*]*/]);
g.drawBackground('background', 0.8);
```
