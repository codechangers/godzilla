# 4. Setup Bullets
 (Step 5/10)

##### 5. In `room.js`, Create a `click` action in the `onMessage()` function.

``` javascript
// File: code/server/rooms/room.js
// Copy
click: () => {

	},
// End Copy
const actions = {
	moveUp: () => g.move(player, 'y', -speed),
	moveDown: () => g.move(player, 'y', speed),
	moveLeft: () => g.move(player, 'x', -speed),
	moveRight: () => g.move(player, 'x', speed),/*[*/
	click: () => {

	},/*]*/
};
g.handleActions(actions, data);
		
```