# Run Game - 7.B

## Add co-operative play.

**(Step 2/4)** Load grave stone image into your game.

### Load grave image.

In `game.js` we need to add a new `loadImage` _function_ to our `preload` _method_.
We also need to upload a picture of a grave stone to repl so we can use it's name in our code. ([New Help?](/tutorials/images)).

```javascript
// File: game.js
// Copy
g.loadImage('grave',  'grave.png');
// End Copy
preload() {
  g.loadImage('background', 'new-background.png');
  g.loadImage('players', 'logo.png');
  g.loadImage('enemies', 'enemy.png');/*[*/
  g.loadImage('grave',  'grave.png');/*]*/
}
```
