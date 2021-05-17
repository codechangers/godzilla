# Run Game - 2.B

## Add enemies to your game.

**(Step 2/6)** Load the enemy image into your game.

### Load your new image.

In `game.js` add a new `loadImage` _function_ in the `preload` _method_ to load your new enemy image.

```javascript
// File: game.js
// Copy
g.loadImage('enemies', 'enemy.png');
// End Copy
preload() {
  g.loadImage('background', 'new-background.png');
  g.loadImage('players', 'logo.png');/*[*/
  g.loadImage('enemies', 'enemy.png');/*]*/
}
```
