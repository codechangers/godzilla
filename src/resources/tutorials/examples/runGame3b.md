
# 3. Add Enemy Movement
 (Step 2/2) To Learn how to make enemies move and recognize collision.

##### 2. In the `onUpdate` function in our `room.js` file we put a `getAllCharacters`  _function_. (for our callback function we will set up some if else statements for the movement.

<iframe width="560" height="315" src="https://www.youtube.com/embed/5mYBdR03rE4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```javascript
// File: code/client/src/game.js
// Copy
g.getAllCharacters('enemy', (enemy, i) => {
	if (enemy.x <= 575 && enemy.right == true) {
		g.move(enemy, 'x', .01 * i + .1);
	}
	else if (enemy.x >= 25) {
		enemy.right = false;
		g.move(enemy, 'x', -.01 * i - .1);
	}
	else {
		enemy.right = true;
	}
});
// End Copy
 onUpdate(dt) {
/*[*/g.getAllCharacters('enemy', (enemy, i) => {
	if (enemy.x <= 575 && enemy.right == true) {
		g.move(enemy, 'x', .01 * i + .1);
	}
	else if (enemy.x >= 25) {
		enemy.right = false;
		g.move(enemy, 'x', -.01 * i - .1);
	}
	else {
		enemy.right = true;
	}
});/*]*/
   g.handleCollision('players',  'enemy',  (player)  =>  {
```