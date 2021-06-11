# Soccer Game - 2.B

## Add a new background to your game.

**(Step 2/3)** Load the new background image into your game.

### Update the image path.

In `game.js`, Change the path to the background image in the `preload` _method_.

```javascript
// File: game.js
// Copy
g.loadImage('background', 'grass.jpg');
// End Copy
preload() {
    g.loadImage('background', /*{*/'bg.png'/*}[*/'grass.jpg'/*]*/);
    g.loadImage('players', 'logo.png');
}
```
