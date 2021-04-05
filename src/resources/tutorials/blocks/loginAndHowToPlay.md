## 1. Adding a login screen
To add a login screen the useLoginScreen method should be used in the game.js file in the create function.  To make sure that their game to start until they login the connect function will be moved into the useLoginScreen method. To be able to use the name that the user inputs it should be passed in as a variable. 
```javascript
create(){
g.useLoginScreen((name) =>  g.connect({ name }), 'Zombies', 'Username', 'Start!');
}
```
The text can be changed to anything you want, the first string will be the Title of the login screen, and can be used to show the name of your game. The second string is what will be shown in the input box. The third string, will be on the button that starts the game. 

If you want the username to show up as a display name for each player you can do that using the attachTo method in the room.js file.  For it to work we will need the type to be 'text' and the text to be `data.name`.
```javascript
onJoin(client,data){
g.attachTo('players', client.sessionId, {
	name:  'nameTag',
	x: -50,
	y: -60,
	type: 'text',
	text: data.name
});
}
```
You can change the x and y values to change where the name tag appears. 
## 2. Adding a how to play/credits screen
To add a how to play/credits screen you will need to have already implemented the useLoginScreen method. Once you do that you can add a method called useHowToScreen underneath your useLoginScreen method. For example:
```javascript
create(){
g.useLoginScreen((name) =>  g.connect({ name }), 'Zombies', 'Username', 'Start!');
g.useHowToScreen("How to play", { w:  'Move Up', a:  'move left', s:  'move down', d:  'move right', click:  "shoot", downArrow:  "move down", upArrow:  "move up", leftArrow:  'move left', rightArrow:  'move right' }, { Artwork:  "Alex Klein", Functionality:  "Alex Klein" })
}
```
The first string will be the title shown in your how to play menu, the next parameter will be an object, this is where you will write your gameplay instructions. The next parameter will also be an object, this is where you can give credit to everyone who helped on your project.

## 3. Adding a player selection option

To create the player selection option a usePlayerSelectScreen method will need to be added to our create function underneath our useLoginScreen method. For example, if I want the user to be able to pick between a cowboy or a zombie my usePlayerSelectScreen method might look like this:
```javascript
g.usePlayerSelectScreen({ players:  'Cowboy.png', zombie:  'zombie.png'})
```
In the object, the item, needs to be the name you gave to your image in the preload function, and then the string is just the name of your image from the assets folder. You can just refer back to your preload function to get both of these. 

Then, the useLoginScreen method needs to be changed to include the spriteName, in order to pass the user's character choice into the server. 
```javascript
g.useLoginScreen((name, spriteName) =>  g.connect({ name, spriteName }), 'Zombies', 'Username', 'Start!');
```
The last thing that needs to be changed for this to work is in the room.js file where the character is created the spriteName needs to be passed into the character. 
```javascript
g.createACharacter('players', client.sessionId, { x:  200, y:  200, score:  0, name:  data.name, spriteName:  data.spriteName });
```

