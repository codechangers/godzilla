# 8. Add Blocks

Step (3/3) To add blocks to your game.

##### 3. in `room.js`, Create the Buy Actions in the `actions`.

```
// File: code/server/rooms/room.js
// Copy 
	buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
	buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),
// End Copy
	/*[*/buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
	buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),/*]*/
```
