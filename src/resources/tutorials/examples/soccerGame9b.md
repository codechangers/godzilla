# Soccer Game - 9.B

## Allow players to place blocks in the game.

**(Step 2/7)** Load block images into the game.

### Load block images.

In `game.js` we need to add some more `loadImage` _functions_ for all our different **block** images to the `preload` _method_.

```javascript
// File: game.js
// Copy
g.loadImage('block1', 'block1.png');
g.loadImage('block2', 'block2.png');
g.loadImage('block3', 'block3.png');
g.loadImage('block4', 'block4.png');
g.loadImage('block5', 'block5.png');
// End Copy
preload() {
	g.loadImage('background', 'grass.jpg');
	g.loadImage('players', 'circle1.png');
	g.loadImage('blobbert', 'circle1.png');
	g.loadImage('grunch', 'circle2.png');
	g.loadImage('neon', 'circle3.png');
	g.loadImage('nimbo', 'circle4.png');
	g.loadImage('tangles', 'circle5.png');
	g.loadImage('goals', 'goal.png');
	g.loadImage('soccerBalls', 'ball.png');/*[*/
	g.loadImage('block1', 'block1.png');
	g.loadImage('block2', 'block2.png');
	g.loadImage('block3', 'block3.png');
	g.loadImage('block4', 'block4.png');
	g.loadImage('block5', 'block5.png');/*]*/
}
```
