# 7. Set up Co-op play

(Step 2/4) To Set up multiplayer gameplay

##### 2. In the `game.js` file in our `preload` _function_ we add a new image. First make sure you have the image in your asset folder ([Need Help?](/tutorials/images/)).

```javascript
// File: code/client/src/game.js
// Copy
g.loadImage('grave',  'grave.png');
// End Copy
preload() {
  g.loadImage('players', 'logo.png');
  g.loadImage('background', 'background.png');
  g.loadImage('enemy', 'enemy.png');/*[*/
  g.loadImage('grave',  'grave.png');/*]*/
}
```
