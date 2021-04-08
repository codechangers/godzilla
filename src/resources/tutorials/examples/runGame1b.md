# 1 Add a Background

(Step 2/6) To learn how to add a background to your game!

##### 2. In `game.js`, Add `loadImage` into the preload() function

<iframe width="560" height="315" src="https://www.youtube.com/embed/Qoq2ZgZPfbw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```javascript
// File: code/client/src/game.js
// Copy
g.loadImage('background',  'background.png');
// End Copy
preload() {
    g.loadImage('players', 'logo.png');/*[*/
    g.loadImage('background',  'background.png');/*]*/
}
```
