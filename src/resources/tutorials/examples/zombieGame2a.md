# 2. Add Zombies
(Step 1/7) Find an Image for the Zombies in Your Game

##### 1. In `game.js` Use `loadImage()` function to add some Zombies inside the `preload()` function.

``` javascript
// File: code/client/src/game.js
// Copy
g.loadImage('zombies', 'zombie.png');
// End Copy
preload() {
	g.loadImage('players', 'logo.png');
	g.loadImage('grass', 'grass.png');/*[*/
	g.loadImage('zombies', 'zombie.png');/*]*/
}
```

> **You will need to uplaod an new image for the zombies. Make sure the image name you add in this step matches the image name in the `imgs` folder.