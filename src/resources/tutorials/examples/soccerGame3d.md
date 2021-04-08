# 3. Add More Characters

Step (4/5) To add more characters to your game

##### 4. Add a player select Screen in `game.js` after the `useLoginScreen()` function.

```javascript
// File: code/client/src/game.js
// Copy
g.usePlayerSelectScreen({
  blobbert: 'circle1.png',
  grunch: 'circle2.png',
  neon: 'circle3.png',
  nimbo: 'circle4.png',
  tangles: 'circle5.png'
});
// End Copy
	g.useLoginScreen(name => g.connect({ name }));/*[*/
	g.usePlayerSelectScreen({
		blobbert: 'circle1.png',
		grunch: 'circle2.png',
		neon: 'circle3.png',
		nimbo: 'circle4.png',
		tangles: 'circle5.png'
	});/*]*/
```
