# 3. Add More Characters

Step (2/5) To add more characters to your game

##### 2. Go into the `loadImage` _function_ in `game.js` and change the name of your character.

```javascript
// File: code/client/src/game.js
// Copy
g.loadImage('players', 'circle1.png');
// End Copy
preload() {
  g.loadImage('players', /*{*/'logo.png'/*}[*/'circle1.png'/*]*/);
  g.loadImage('background', 'grass.jpg');
}
```
