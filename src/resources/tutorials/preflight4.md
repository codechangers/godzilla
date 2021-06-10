# Add Images to your Game

##### 1. Go into the `preload` _function_ in `game.js` and change the name of your background image. Have it match the name of the image you just added into the `imgs` folder.

```javascript
// File: game.js
// Copy
g.loadImage('background', 'bg.png');
// End Copy
preload() {
   g.loadImage('background', /*{*/'bg.png'/*}[*/'newimage.png');/*]*/
}
```

###### Make sure to only us `.png` or `.jpg` files, `.jpeg` and `.gif` will not load in your game.