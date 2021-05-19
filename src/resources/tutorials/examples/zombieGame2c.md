# 1. Change The Background and Character

## Change The Main Character

Change the Character of your game

### Update the image path.

In `game.js`, Change the path to the players image in the `preload()` _method_.

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
