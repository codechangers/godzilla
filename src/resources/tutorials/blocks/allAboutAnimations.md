## 1. Creating animations 
The playAnimation method is the main step in creating an animation for the game. It can be placed in any function in the room.js file. In this example it will be used in the onMessage function in the click function so that the animation will be played any time a user clicks. 

```javascript
onMessage(client, data) {
	const  player = g.getACharacter('players', client.sessionId);
	const  actions = {
		click: () => {
			g.playAnimation(player, 'rotation', 360, 2000);
		}
	};
	g.handleActions(actions, data);
}
```
The playAnimation method takes in 4 parameters, the first one is the specific object you want to animate, in this case, the player. The second is a string, it will be the attribute you want to change on your object, in this case it's rotation, but you can change it to the x, or y value of your object or anything else you want. The next is a number which will be the value that the attribute is changed by. The last is also a number, which will be the amount of time you'd like the animation to take to complete. 1000 would be 1 second.

Then you will just need to add a handleAnimations function into the onUpdate function in the room.js file.  For example:
```javascript
onUpdate(client,data){
g.handleAnimations('players');
}
```
The only parameter is a string, which will be the type of character or resource you are animating. 
