# Soccer Game - 4.C

## Add soccer goals.

**(Step 3/8)** Load the new goal image into your game.

### Load goal image.

In `game.js` we need to add a new `loadImage` _function_ to our `preload` _method_.

```javascript
// File: game.js
// Copy
g.loadImage('goals', 'goal.png');
// End Copy
preload() {
  g.loadImage('background', 'grass.jpg');
  g.loadImage('players', 'circle1.png');
  g.loadImage('blobbert', 'circle1.png');
  g.loadImage('grunch', 'circle2.png');
  g.loadImage('neon', 'circle3.png');
  g.loadImage('nimbo', 'circle4.png');
  g.loadImage('tangles', 'circle5.png');/*[*/
  g.loadImage('goals', 'goal.png');/*]*/
}
```
