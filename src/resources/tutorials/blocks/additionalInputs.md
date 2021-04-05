## 1. Adding a key input
To add a new key into the game the first thing needed is the keyCode that goes along with that key. You can find a list of all the key codes here: 
[key codes](https://www.codecontest.org/docs/keycodes/) 
Then, the key code should be added to the game.js file. For example:
```javascript
const keys = {
w: keyCodes.W
};
```
Then it will need to be added to the update function in the game.js file along with an action that should take place when the key is pressed. In this case I want the character to move up when the key W is pressed. 
```javascript
update() {
	if (g.canSend()) {
		const {w} = g.getKeysDown();
		if (w || down) g.sendAction('moveUp');
	}
}
```
Then, the game will receive the action in the server and tell the character what to do when the button is pressed. This happens in the onMessage function in the room.js file. In this case I would add a new action to the actions object called moveUp. Then, tell the server what should take place when it receives the message of 'moveUp'. 
```javascript
onMessage(){
	const  player = g.getACharacter('players', client.sessionId);
	const  actions = {
		moveUp: () =>  g.move(player, 'y', -speed)
	};
	g.handleActions(actions, data);
}
``` 
## 2. Adding a click event
To add a click event the first thing needed is to use a sendAction method in the click function in the game.js file. 
```javascript
click(x,y){
g.sendAction(‘click’)
}
```
Then the message needs to be received in the room.js file in the onMessage function, In this case I want to add an animation to my character when a user clicks, so I add a new action to the actions object called click. Then, tell the server what should take place when it receives the message of 'click'. 
```javascript
onMessage(){
	const  player = g.getACharacter('players', client.sessionId);
	const  actions = {
		click: () =>  g.playAnimation(player, 'rotation', 360, 1000);
	};
	g.handleActions(actions, data);
}
``` 

## 3. Adding a mouse movement event
To add a mouse movement event the first thing needed is to create a mousemove function with a sendAction method inside, in the game.js file. 
```javascript
mousemove(x,y){
g.sendAction(‘mousemove’, {x,y})
}
```
Then the message needs to be received in the room.js file in the onMessage function, In this case I want to add an animation to my character so that it will always rotate towards where the mouse is, so I add a new action to the actions object called mousemove. Then, tell the server what should take place when it receives the message of 'mousemove'. 
```javascript
onMessage(){
	const  player = g.getACharacter('players', client.sessionId);
	const  actions = {
		mousemove: () => {
			player.rotation = g.getRotationTowards(player, data.x, data.y);
		}
	g.handleActions(actions, data);
}
``` 
