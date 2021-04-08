# 2. Add a Background

Step (2/3) To create a background for your game.

##### 2. Go into the `preload` _function_ in `game.js` and add a new image named after the new character set.

```javascript
// File: code/client/src/game.js
// Copy
g.loadImage('background', 'grass.jpg');
// End Copy
preload() {
	g.loadImage('players', 'logo.png');/*[*/
	g.loadImage('background', 'grass.jpg');/*]*/
}
```
