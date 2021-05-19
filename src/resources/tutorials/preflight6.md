# Add Images to your Game

##### 3. In the `preload` _function_ in `game.js` add code to load the image for the character in your game.

```javascript
// File: game.js
// Copy
g.loadImage('players', 'logo.png');
// End Copy
preload() {
   g.loadImage('background', 'bg.png');
   /*[*/g.loadImage('players', 'logo.png');/*]*/
}
```

> ** Make sure to change the name of the image you copied to match the name of the images you added to the `img` folder. Leave the name `players` the same.