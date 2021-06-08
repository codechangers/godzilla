# Zombie Game - 1.B

## Add a new background and character to your game.

**(Step 2/5)** Load the new background into your game.

### Update the image path.

In `game.js`, Change the path to the background image in the `preload` _method_.

```javascript
// File: game.js
// Copy
g.loadImage('background', 'new-background.png');
// End Copy
preload() {
    g.loadImage('background', /*{*/'bg.png'/*}[*/'new-background.png'/*]*/);
    g.loadImage('players', 'logo.png');
}
```
