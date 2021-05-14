# Run Game - 2.A

## Add enemies to your game.

**(Step 1/5)** Load the enemy image into your game.


##### 1. Go into the `preload` _function_ in `game.js` and add a new image named after the new character set.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Im13AGNYlWM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```javascript
// File: code/client/src/game.js
// Copy
g.loadImage('enemy', 'enemy.png');
// End Copy
preload() {
  g.loadImage('players', 'logo.png');
  g.loadImage('background', 'background.png');/*[*/
  g.loadImage('enemy', 'enemy.png');/*]*/
}
```
