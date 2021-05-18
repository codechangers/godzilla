# Soccer Game - 3.B

## Add more characters.

**(Step 2/5)** Load your first character image.

### Load default character.

In `game.js` we need to change our `loadImage` _function_ for the **players** image in the `preload` _method_.

```javascript
// File: game.js
// Copy
g.loadImage('players', 'circle1.png');
// End Copy
preload() {
  g.loadImage('background', 'grass.jpg');
  g.loadImage('players', /*{*/'logo.png'/*}[*/'circle1.png'/*]*/);
}
```
