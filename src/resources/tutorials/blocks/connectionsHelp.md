## 1. Sending actions to server

First, we are setting this up so that when someone uses the _keyboard_ or _mouse_ everyone else playing your game will know as well. To do this we will  need to send the ```action``` to a server that is running everyones game. This is done with the `sendAction` _function_ on the ```click``` _method_ in the **game.js** file.
```javascript
click(x, y) {
	g.sendAction('click', { x, y });
}
```
This allows you to send the spot that the person clicked in the game to everyone else playing the game.
## 2. Receiving the action

Now we need to receive the  _message_  in the  **room.js**  file. In the  **room.js**  file we need to get all of the actions and tell your game what to do when they receive an action. To do this we will get them all in the `onMessage`  _method_.
```javascript
onMessage(client, data) {
	const  actions = {
		click: () =>  g.createACharacter('zombie', g.nextCharacterId('zombie'), {x:data.x, y:data.y}),
	}
}
```
This would create a character at the spot that they clicked when anyone clicks.

Then, in the  **room.js**  file we need to put the  `handleActions`  _function_ to run all of your actions when an action occurs. We put this in the  `onMessage`  _method_ under our actions that we received.
```javascript
onMessage(client,data) {
	...
	g.handleActions(actions, data);
}
```

