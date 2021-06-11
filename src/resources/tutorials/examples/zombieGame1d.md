# Zombie Game - 1.D

## Add a new background and character to your game.

**(Step 4/5)** Load your new character image into the game.

### Update the character image path.

In `game.js`, Change the path to the players image in the `preload` _method_.

```javascript
// File: game.js
// Copy
g.loadImage('players', 'new-player.png');
// End Copy
preload() {
    g.loadImage('background', 'new-background.png');
    g.loadImage('players', /*{*/'logo.png'/*}[*/'new-player.png'/*]*/);
}
```
