# Soccer Game - 3.C

## Add more characters.

**(Step 3/5)** Load all your other character images.

### Load optional character images.

In `game.js` we need to add more `loadImage` _functions_ to our `preload` _method_.

```javascript
// File: game.js
// Copy
g.loadImage('blobbert', 'circle1.png');
g.loadImage('grunch', 'circle2.png');
g.loadImage('neon', 'circle3.png');
g.loadImage('nimbo', 'circle4.png');
g.loadImage('tangles', 'circle5.png');
// End Copy
preload() {
	g.loadImage('background', 'grass.jpg');
	g.loadImage('players', 'circle1.png');/*[*/
	g.loadImage('blobbert', 'circle1.png');
	g.loadImage('grunch', 'circle2.png');
	g.loadImage('neon', 'circle3.png');
	g.loadImage('nimbo', 'circle4.png');
	g.loadImage('tangles', 'circle5.png');/*]*/
}
```

> **You can change the names of the characters to whatever you want, they don't have to be named blobbert, grunch, etc**
