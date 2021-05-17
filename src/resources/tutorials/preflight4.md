# Add Images to your Game

##### 1. Go into the `preload` _function_ in `game.js` and add your background image to your game.

```javascript
// File: game.js
// Copy
   g.loadImage('background', 'bg.png');
// End Copy
preload() {
   /*[*/g.loadImage('background', 'bg.png');/*]*/
}
```

** Make sure to change the names of the image to match the names of the images you added to the `img` folder. Leave the name `background` the same.