Before using this tutorial you might want to checkout the Adding a new Character set tutorial, and the All about Items tutorial to make sure your game is to the point that you are able to setup collision.
## 1 . Setting up Character/Resource Collision
To set up collision between two characters, or a character and a resource the handleCollision method should be used. If you want the game to always be searching for the collision the handleCollision method should be placed in your room.js file in your onUpdate function.  In this example I am checking for collision between two characters, so that I can lower the health of one when they collide. 
```javascript
onUpdate(client, data){
	g.handleCollision('players', 'zombie', player  =>  player.healthBar.filled > 0 ? player.healthBar.filled -= .01 : null);
}
```
The first parameter should be a string and should be the first type of character/resource that you are checking. The second should be a string as well and should be the second type of character/resource that you are checking. The third parameter should be a callback function for what you want to happen when these two things collide. In this case, I am taking the player that hit a zombie and lowering their health. 
## 2. Setting up Item Collision
To set up collision between a character held item and another character or resource the handleItemCollision method should be used. If you want the game to always be searching for the collision the handleItemCollision method should be placed in your room.js file in your onUpdate function.  In this example I am checking for collision between an Item and a character, so that I can  delete the character that was hit. 
```javascript
onUpdate(client, data){
	g.handleCollision('players', 'sword', 'zombie', (bullet,sword,zombie) => { g.deleteACharacter("zombie", zombie.id)}
}
```
The first parameter should be a string and should be the first type of character/resource that you are checking. The second should be a string as well and should be the name of the item that you are checking. The third should be a string as well and should be the second type of character/resource that you are checking. The fourth parameter should be a callback function for what you want to happen when these two things collide. In this case, I am deleting the zombie that was hit by the sword.  
