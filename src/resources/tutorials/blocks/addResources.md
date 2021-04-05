## 1. Uploading an image

Resources are for the players to be able to collect different resources in order to use or unlock certain items in the game. In order to create a resource we will start in the **game.js** file by uploading the image for our resource with the `loadImage` _function_. This will be done in the `preload` _method_.
```javascript
preload() {
	g.loadImage("trees", "tree.png");
}
```
## 2. Adding the resource

Now we need to add the _resource_ to the **room.js** and **game.js** files. In the **room.js** file we need to put the `setupResources` _function_ in the `onInit` _method_.
```javascript
onInit() {
	g.setupCharacters("trees");
}
```
Then, in the **game.js** file we need to put the `addResources`  _function_ in the `init`  _method_.

```javascript
init() {
	g.addCharacters("trees");
}
```
And the `getResources` _function_ in the `create` _method_.
```javascript
create() {
	g.getCharacters("trees");
}
```
## 3. Creating the Resources
Now you can use the `createAResource`  _function_ in **room.js** file to create the new _resource_ or the `createResources` _function_ to create many _resources_ randomly across the map.  To do this the `createResources` or `createAResource` _functions_ will be placed anywhere in the **room.js** file. In this example the new _resources_ will be created as soon as the game starts. in the `onInit`  _method_.
```javascript
onInit() {
	g.createResources("trees", 50);
}
```
This will create 50 trees randomly across your game board.
## 4. Using Resources
The main difference between _resources_ and _characters_ is you will be able to collect the resources and can use them for a store or as an item that they can place to build things. To do this you can follow the **setup Item** tutorial and the **use Item** tutorial for how to make items to go with your resources.

They can also be used in the store as resources you need to buy a certain item which can be seen in the **add a Store** tutorial.

In order for each player to keep track of its resources you will have to add or subtract from their resources which can be done at any time in the **room.js** file.

```javascript
player['trees'] += 1;
```
