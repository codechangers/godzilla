# Zombie Game - 4.B

## Add shooting to the game.

**(Step 2/10)** Load the bullet image into the game.

### Load the bullet image.

In `game.js`, we need to add another `loadImage` _function_ to the `preload` _method_. This will load our bullet image into the game.

``` javascript
// File: game.js
// Copy
g.loadImage('bullets', 'bullet.png');
// End Copy
preload() {
	g.loadImage('background', 'new-background.png');
	g.loadImage('players', 'new-player.png');
	g.loadImage('zombies', 'zombie.png');/*[*/
	g.loadImage('bullets', 'bullet.png');/*]*/
}
```
