# 1 Add a Background
 (Step 2/5)

##### 2. In `game.js`, Go into the `preload()` _function_ in `game.js` and add a new image named after the new character set.

``` javascript
// File: code/client/src/game.js
// Copy
g.loadImage('grass', 'grass.png');
// End Copy
preload() {
	g.loadImage('players', 'logo.png');/*[*/
	g.loadImage('grass', 'grass.png');/*]*/
}

```

> **After you paste this code into your project, make sure to change the name, and file name to fit match the image name you uploaded into the Asset Folder.**