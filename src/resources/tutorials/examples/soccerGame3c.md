# 3. Add More Characters

Step (3/5) To add more characters to your game

##### 3. Add the rest of your character images in the `loadImage` _function_ in `game.js`

```javascript
// File: code/client/src/game.js
// Copy
<<<<<<< HEAD
	g.loadImage('blobbert', 'circle1.png');
	g.loadImage('grunch', 'circle2.png');
	g.loadImage('neon', 'circle3.png');
	g.loadImage('nimbo', 'circle4.png');
	g.loadImage('tangles', 'circle5.png');
=======
g.loadImage('blobbert', 'circle1.png');
g.loadImage('grunch', 'circle2.png');
g.loadImage('neon', 'circle3.png');
g.loadImage('nimbo', 'circle4.png');
g.loadImage('tangles', 'circle5.png');
>>>>>>> fa7d7d93150f6a5493d35bea168bbdb1a0bdc6e8
// End Copy
preload() {
	g.loadImage('players', 'circle1.png');
	g.loadImage('background', 'grass.jpg');/*[*/
	g.loadImage('blobbert', 'circle1.png');
	g.loadImage('grunch', 'circle2.png');
	g.loadImage('neon', 'circle3.png');
	g.loadImage('nimbo', 'circle4.png');
	g.loadImage('tangles', 'circle5.png');/*]*/
}
```

> **You can change the names of the characters to whatever you want, they don't have to be named blobbert, grunch, etc**
