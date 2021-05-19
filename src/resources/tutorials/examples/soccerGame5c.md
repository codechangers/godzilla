# Soccer Game - 5.C

## Add soccer balls.

**(Step 3/6)** Load the soccer ball image.

### Load the soccer ball image.

In `game.js` we need to add another `loadImage` _function_ to the `preload` _method_.

```javascript
// File: game.js
// Copy
g.loadImage('soccerBalls', 'ball.png');
// End Copy
preload() {
	g.loadImage('background', 'grass.jpg');
	g.loadImage('players', 'circle1.png');
	g.loadImage('blobbert', 'circle1.png');
	g.loadImage('grunch', 'circle2.png');
	g.loadImage('neon', 'circle3.png');
	g.loadImage('nimbo', 'circle4.png');
	g.loadImage('tangles', 'circle5.png');
	g.loadImage('goals', 'goal.png');/*[*/
	g.loadImage('soccerBalls', 'ball.png');/*]*/
}
```
