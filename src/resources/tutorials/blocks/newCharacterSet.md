## 1. Uploading an image
First, we need to upload a new image to use for the new _character_ set. To do this we will go into the `preload` _method_ in **game.js** and add a new image named after the new _character_ set.
```javascript
preload() {
	g.loadImage("zombies", "zombie.png");
}
```
## 2. Adding the Character
Now we need to add the _character_ to the **room.js** and **game.js** files. In the **room.js** file we need to put the `setupCharacters` _function_ in the `onInit` _method_.
```javascript
onInit() {
	g.setupCharacters("zombies");
}
```
Then, in the **game.js** file we need to put the `addCharacters` _function_ in the `init` _method_. If you want to change the size of your _character_ you can do this in the `addCharacters` _function_ by adding another _parameter_. ie. `addCharacters('players', 0.5)`, the lower the number the smaller your _character_ will be: 0.5 would be half size, 2 would be twice as big.
```javascript
init() {
	g.addCharacters("zombies");
}
```
And the `getCharacters` _function_ in the `create` _method_.
```javascript
create() {
	g.getCharacters("zombies");
}
```
## 3. Creating the Character
Now you can use the `createACharacter` _function_ in **room.js** file to create the new _character_ wherever it is needed. In this example the new _character_ will be created near the top left of the screen and will be created as soon as the game starts. To do this the `createACharacter` will be placed in the **room.js** file in the `onInit` _method_.
```javascript
onInit() {
	g.createACharacter("zombies", g.nextCharacterId("zombies"), {x: 20, y: 20});
}
```
The **X** and **Y** values can be changed to position the _character_ anywhere in the game.
