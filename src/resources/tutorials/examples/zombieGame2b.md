# Zombie Game - 2.B

## Add zombies into your game.

**(Step 2/7)** Loading your zombie image into your game.

### Load your zombie image.

In `game.js`, we need to add a new `loadImage` _function_ to the `preload` _method_.
This will load your zombie image into the game!

``` javascript
// File: game.js
// Copy
g.loadImage('zombies', 'zombie.png');
// End Copy
preload() {
    g.loadImage('background', 'new-background.png');
    g.loadImage('players', 'new-player.png');/*[*/
    g.loadImage('zombies', 'zombie.png');/*]*/
}
```
