### 1. Drawing the background
To draw the background the `drawBackground` _function_ should be used, and the `loadImage` _function_ should be used. The background image should be added to the **code/client/asset/** folder first. Then using a `loadImage` _function_, it should be added to the **game.js** file in the `preload` _method_. 
```javascript
// File: code/client/src/game.js
preload(){
	...
	g.loadImage('grass', 'grass.png');
}
```
After that, still in the **game.js** file a `drawBackground` _function_ should be used in the `create` _method_, to set the size of the image, and the background for the game.
```javascript
// File: code/client/src/game.js
create(){
	...
	g.drawBackground('grass', 1, 2000, 2000)
}
```
The _string_, should be the name that you gave to your image. The first number can be changed to scale the size of your image, ie. 0.5 for half size. The last two numbers can be changed to customize the width and height of your background. 

### 2. Setting game boundaries

The first step to setting up the boundaries for the game is to tell the server the size of the game. To do this a `setBounds` _function_ should be used in the `onInit` _method_ in the **room.js** file.   
```javascript
// File: code/server/rooms/room.js
onInit(){
	...
	g.setBounds(2000, 2000);
}
```
Make sure it is written after the `setup` _function_. The numbers can be changed to customize the width and height of the game bounds. 

### 3. Getting the camera to follow a character

To get the camera to follow a _character_ the `getCharacters` _function_ for that _character_ should take in a _function_ as a _parameter_. The _function_ should use the `myId` _function_ to find which player the camera should be following. Then, use the `cameraFollow` _function_ to assign the camera to that _character_. 
  
```javascript
// File: code/client/src/game.js
create(){
	...
	g.getCharacters('players',
		(player) => {
			if (player.id === g.myId()) {
				g.cameraFollow(player.sprite);
			}
		});
}
```

