---
title: Zombie Game
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---
## 1. Follow the build your game tutorial
{% include blocks/gettingStarted.md %}
## 2. Add the background
Next, we'll get the background and our game boundaries setup. First, make sure that you have the image that you want for your background added to your asset folder **(Click on: code > client > asset)** ([Need Help?](/tutorials/images/)). Next, let's use the [drawBackground](/docs/drawBackground/) _function_ to create our game background. To do this we'll go into our **game.js** file and into our `preload` _method_ and add the background image that we want to use. We do this by writing a [loadImage](/docs/loadImage/) _function_ like this:
> **Note:** Put your own image name here if it isn't called `grass.png`.

```javascript
// Click on: code > client > src > game.js

preload() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.loadImage('grass', 'grass.png');
	// End of the new code.
}
```
{% capture code %}
g.loadImage('grass', 'grass.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
After that we stay in the **game.js** file and write a [drawBackground](/docs/drawBackground/) _function_ in our `create` _method_, which will look like this:
```javascript
// Click on: code > client > src > game.js

create() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.drawBackground('grass', 1, 2000, 2000);
	// End of the new code.
}
```
{% capture code %}
	g.drawBackground('grass', 1, 2000, 2000);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
> Again remember to add the name of your image in place of grass, and to change the numbers based on how big you want your game to be.

Now let's make it so our _character_ can't go out of bounds, to do this we will go into our **room.js** file and set our bounds using the [setBounds](/docs/setBounds/) _function_ which will go into our `onInit` _method_. It should look like this:
```javascript
// Click on: code > server > rooms > room.js

onInit() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.setBounds(2000, 2000);
	// End of the new code.
}
```
{% capture code %}
	g.setBounds(2000, 2000);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Make sure that you write it after your `setup` _function_ or else it will break your game. You can change the numbers to make the bounds whatever size you want.
## 3. Setup the camera follow function
> **Hint:** Click on a _function_ name, to get more information on how to customize it!

The next step is to get the camera to follow your _character_ so that it won't be able to leave the screen. To do this we need to use two new _methods_, the [myId](/docs/myId/) _function_ (to get which player we want the camera to follow) and the [cameraFollow](/docs/cameraFollow/) _function_ (to get the camera to start following our player).

We add the new _function_ into our **game.js** file in the `create` _method_, then in our [getCharacters](/docs/getCharacters/) _function_ as the second _parameter_. To do this we put a comma after the `'players'` _string_ and then write our _function_ in. We need an _if statement_ to determine if we're getting the right player, then when we know we do, we assign the camera to follow that player. It should look like this when it's finished:
```javascript
// Click on: code > client > src > game.js

create() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
	// End of the new code.
}
```
{% capture code %}
		g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Make sure that you **don't** write a new [getCharacters](/docs/getCharacters/) _function_, just change the one you already had for `'players'`.

## 4.  Add the zombies
Now let's add the Zombies! First, we need to upload a new image to use for the zombies ([Need Help?](/tutorials/images/)), so we go back into our `preload` _function_ in the **game.js** file and add a new image called zombies:
```javascript
// Click on: code > client > src > game.js

preload() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.loadImage('zombies', 'zombie.png');
	// End of the new code.
}
```
{% capture code %}
	g.loadImage('zombies', 'zombie.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then we need to add our zombie _character_ to our **game.js** and **room.js** _files_, to do this we need to go into our `onInit` _method_ in **room.js** and add a [setupCharacters](/docs/setupCharacters/) _function_ to it:
```javascript
// Click on: code > server > rooms > room.js

onInit() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.setupCharacters('zombies');
	// End of the new code.
}
```
{% capture code %}
	g.setupCharacters('zombies');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Next we go to our `init` _method_ in **game.js** and add an [addCharacters](/docs/addCharacters/) _function_:
```javascript
// Click on: code > client > src > game.js

init() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.addCharacters('zombies', 0.5);
	// End of the new code.
}
```
{% capture code %}
	g.addCharacters('zombies', 0.5);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Next we go into our `create` _method_ in **game.js** and add a [getCharacters](/docs/getCharacters/) _function_:
```javascript
// Click on: code > client > src > game.js

create() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.getCharacters('zombies');
	// End of the new code.
}
```
{% capture code %}
	g.getCharacters('zombies');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then, since we want the zombies to spawn randomly all over the map, and just keep spawning, we'll have to create a `setInterval` _function_ in our `onInit` _method_ in our **room.js** file, that will spawn our zombies for us:
```javascript
// Click on: code > server > rooms > room.js

onInit() {
	// You might have some other code here.
	// Add this new code below your other code:
	setInterval(() => g.createACharacter('zombies',
		g.nextCharacterId('zombies'), {
			x: Math.floor((Math.random() * 2000) + 1),
			y: Math.floor((Math.random() * 2000) + 1)
		}), 2500);
	// End of the new code.
}
```
{% capture code %}
	setInterval(() => g.createACharacter('zombies',
		g.nextCharacterId('zombies'), {
			x: Math.floor((Math.random() * 2000) + 1),
			y: Math.floor((Math.random() * 2000) + 1)
		}), 2500);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
The number at the end will determine how long to wait until it spawns another zombie, and the two 2000 numbers are the bounds for where the zombies should spawn. Now that the zombies are spawning we want them to follow us. To do this all we need to do is add a [follow](/docs/follow/) _function_ into our `onUpdate` _method_ in **room.js**:
```javascript
// Click on: code > server > rooms > room.js

onUpdate(dt) {
	// You might have some other code here.
	// Add this new code below your other code:
	g.follow('players', 'zombies', 1, 0.1);
	// End of the new code.
}
```
{% capture code %}
	g.follow('players', 'zombies', 1, 0.1);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
You can change the numbers to change the distance the zombies will come to your character, and the speed of the zombies.

## 5. Add a health bar
 Next, we'll add a health bar, so that if the zombies hit us, we'll lose health. The first thing we need to do is go into our `onJoin` _method_ in the **room.js** file and add an [attachTo](/docs/attachTo/) _function_:
```javascript
// Click on: code > server > rooms > room.js

onJoin(client, data) {
	// You might have some other code here.
	// Add this new code below your other code:
	g.attachTo('players', client.sessionId, {  
		name: 'healthBar',
		x: -50, 
		y: 40,
		width: 100,
		height: 10,
		type: 'bar',
		filled: 100
	});	
	// End of the new code.
}
```
{% capture code %}
	g.attachTo('players', client.sessionId, {  
		name: 'healthBar',
		x: -50, 
		y: 40,
		width: 100,
		height: 10,
		type: 'bar',
		filled: 100
	});	
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now we have a health bar but we don't lose health when we are hit, to fix this we need to add a [handleCollision](/docs/handleCollision/) _function_ into our `onUpdate` _method_ in **room.js**:
```javascript
// Click on: code > server > rooms > room.js

onUpdate(dt) {
	// You might have some other code here.
	// Add this new code below your other code:
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});
	// End of the new code.
}
```
{% capture code %}
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});	
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Once we do that, we will be able to be hit by the zombies and have our health go down.
## 6.  Setup bullets
Now, we need to give our character the ability to fight back against the zombies by using bullets. To create bullets what we can do is actually create another _character_ set and call it `'bullets'` so we'll do the same thing that we did to create the first _character_ set. In our **game.js** file in the `init` _method_ we'll add an [addCharacter](/doc/addCharacter/) _function_ with the name of bullet.
```javascript
// Click on: code > client > src > game.js

init() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.addCharacters('bullets', 0.5);
	// End of the new code.
}
```
{% capture code %}
	g.addCharacters('bullets', 0.5);	
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then we'll want to add an image for the bullet in the `preload` _method_ in **game.js**: ([Need Help?](/tutorials/images/))
```javascript
// Click on: code > client > src > game.js

preload() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.loadImage('bullets', 'bullet.png');
	// End of the new code.
}
```
{% capture code %}
	g.loadImage('bullets', 'bullet.png');	
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
We then add a [getCharacters](/docs/getCharacters/) _function_ for our bullet into our `create` _method_ in **game.js**:
```javascript
// Click on: code > client > src > game.js

create() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.getCharacters('bullets');
	// End of the new code.
}
```
{% capture code %}
	g.getCharacters('bullets');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now we go into our **room.js** to set up our bullet in the server, to do this we add a [setupCharacters](/docs/setupCharacters/) _function_ into our `onInit` _method_ for our bullet:
```javascript
// Click on: code > server > rooms > room.js

onInit() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.setupCharacters('bullets');
	// End of the new code.
}
```
{% capture code %}
	g.setupCharacters('bullets');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now we just need to get the bullets to shoot, to do this we need to add a new action into our actions object in our `onMessage` _method_ in **room.js** so we'll go to the last action we created which was probably `moveDown` and we'll add a comma afterward and then press the return key to start a new line. Here we will add a `click` action where we'll write the code that will make our bullets shoot.
```javascript
// Click on: code > server > rooms > room.js

onMessage() {
	// There is some code up here.
	const actions = {
		// There is a little bit more code here.
		// Don't forget to add a comma at the end.
		// Add this new code here:
		click: () => {
			// **Empty Space**

		},
		// End of the new code.
	};
}
```
{% capture code %}
			click: () => {

		},
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Inside our `click` action the first thing we want to do is define a _variable_ to keep track of the Id of each bullet for when we tell them to move. The way we'll keep track of this is setting our _variable_ equal to the id that the [nextCharacterId](/docs/nextCharacterId/) _function_ gives us for the bullets.
```javascript
			// Add this below the **Empty Space**
			const index = g.nextCharacterId('bullets');
```
{% capture code %}
	const index = g.nextCharacterId('bullets');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
After that, we need to tell the game to create a bullet when we click, so we add a [createACharacter](/docs/createACharacter/) _function_ for creating our bullets, when we do this we can use the player's x and y values to tell the game to create the bullet in the same place that the player is.
```javascript
			// Add this next.
			g.createACharacter('bullets', index, { x: player.x, y: player.y, playerId: player.id });
```
{% capture code %}
	g.createACharacter('bullets', index, { x: player.x, y: player.y, playerId: player.id });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now we'll use our _variable_ that keeps track of the bullet Id to define a new _variable_ that actually keeps track of each bullet.
```javascript
			// Then add this.
			let newCharacter = g.getACharacter('bullets', index);
```
{% capture code %}
	let newCharacter = g.getACharacter('bullets', index);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then we need to animate them so they don't stay in the same spot the whole time. So we'll use the [playAnimation](/docs/playAnimation/) _function_ to get them to move, and inside of those we will use the [getXTowards](/docs/getXTowards/) and the [getYTowards](/docs/getYTowards/) _functions_ to tell the bullets to move towards where a player clicked.
```javascript
			// These go next.
			g.playAnimation(newCharacter, 'x',
				g.getXTowards(newCharacter, data.x, data.y) * 500, 2000);  
			g.playAnimation(newCharacter, 'y',
				g.getYTowards(newCharacter, data.x, data.y) * 500, 2000);
```
{% capture code %}
			g.playAnimation(newCharacter, 'x',
			g.getXTowards(newCharacter, data.x, data.y) * 500, 2000);  
			g.playAnimation(newCharacter, 'y',
			g.getYTowards(newCharacter, data.x, data.y) * 500, 2000);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
You can change the first number to change the distance that the bullet will shoot, and the second number to change the speed of the bullet. Now there is only one more line that we need in our `click` action, and it will make our bullets disappear once they reach the end of their range. It's a `setTimeout` _function_ that will use the [deleteACharacter](/docs/deleteACharacter/) _function_ to delete a bullet.
```javascript
			// This is the last step!
			setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), 2000);
```
{% capture code %}
	setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), 2000);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
When you write this function you want to make sure that the number at the end matches the number at the end of your [playAnimation](/docs/playAnimation/) _functions_, in this example they are both 2000. Now your `click` action should look similar to this.
```javascript
// Click on: code > server > rooms > room.js

onMessage() {
	// There is some code up here.
	const actions = {
		// There is a little bit more code here.
		click: () => {
			// This is what we added: 
			const index = g.nextCharacterId('bullets');
			g.createACharacter('bullets', index, { x: player.x, y: player.y });
			let newCharacter = g.getACharacter('bullets', index);
			g.playAnimation(newCharacter, 'x',
				g.getXTowards(newCharacter, data.x, data.y) * 500, 2000);  
			g.playAnimation(newCharacter, 'y',
				g.getYTowards(newCharacter, data.x, data.y) * 500, 2000);
			setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), 2000);
			// End of what we added.
		},
	};
}
```
{% capture code %}
			const index = g.nextCharacterId('bullets');
			g.createACharacter('bullets', index, { x: player.x, y: player.y });
			let newCharacter = g.getACharacter('bullets', index);
			g.playAnimation(newCharacter, 'x',
				g.getXTowards(newCharacter, data.x, data.y) * 500, 2000);  
			g.playAnimation(newCharacter, 'y',
				g.getYTowards(newCharacter, data.x, data.y) * 500, 2000);
			setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), 2000);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now there is only two more things we need to do to make our bullets shoot, first check and make sure your **game.js** file has a `click` _method_ that looks like this:
```javascript
// Click on: code > client > src > game.js

click(x, y) {  
	// You might have some other code here.
	// Add this new code below your other code:
	g.sendAction('click', {x, y}); 
	// End of the new code.
}
```
{% capture code %}
	g.sendAction('click', {x, y}); 
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
And finally, we just need to add a [handleAnimations](/docs/handleAnimations/) _function_ into our `onUpdate` _method_ in the **room.js** file _function_ for our bullets.
```javascript
// Click on: code > server > rooms > room.js

onUpdate(dt) {
	// You might have some other code here.
	// Add this new code below your other code:
	g.handleAnimations('bullets');
	// End of the new code.
}
```
{% capture code %}
	g.handleAnimations('bullets');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now our bullets should be shooting when we click, but they aren't killing the zombies yet, so to make that happen we just need to add another [handleCollision](/docs/handleCollision/) _function_ into our `onUpdate` _method_ right under our last one. This time for the bullet and the zombie.
```javascript
// Click on: code > server > rooms > room.js

onUpdate(dt) {
	// You might have some other code here.
	// Add this new code below your other code:
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
	});
	// End of the new code.
}
```
{% capture code %}
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now you should have working bullets that can kill the zombies when you shoot!
## 7.  Setup a login screen
Now we'll set up a login screen for our game so that when people join they can choose a display name for their character. To do this we need to go into our **game.js** file and add a line into our `create` _method_, but first we'll delete the [connect](/docs/connect/) _function_ that is in there so we can move it into our [useLoginScreen](/docs/useLoginScreen/) _function_. Then we add a [useLoginScreen](/docs/useLoginScreen/) _function_ in its place.
```javascript
// Click on: code > client > src > game.js

create() {
	// You might have some other code here.
	// Delete this old code:
	g.connect();
	// Then add this new code where we deleted the old code:
	g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Username', 'Start!');
	// End of the new code.
	// You might have some other code here.
}
```
{% capture code %}
	g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Username', 'Start!');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
You can customize your login screen by changing the text in place of zombies, username, and start, to whatever you want. Then, to add the nametags to our characters, we just need to go into our **room.js** file and add an [attachTo](/docs/attachTo/) _function_ into our `onJoin` _method_. This time we will give it a type of text instead of bar.
```javascript
// Click on: code > server > rooms > room.js

onJoin(client, data) {
	// You might have some other code here.
	// Add this new code below your other code:
	g.attachTo('players', client.sessionId, {  
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});
	// End of the new code.
}
```
{% capture code %}
	g.attachTo('players', client.sessionId, {  
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
You can change the x and y numbers to change where the name tag shows up on your _character_. Then to add your name to your _character_ we'll just go into our **room.js** file in our `onJoin` _method_ and add another _item_ to our _character object_ called name, and we'll give it the value of `data.name`. Then our [createACharacter](/docs/createACharacter/) _function_ should look more like this:
```javascript
// Click on: code > server > rooms > room.js

onJoin(client, data) {
	// You might have some other code here.
	// Delete this old code:
	g.createACharacter('players', client.sessionId, { x: 200, y: 200 });
	// Then add this new code where we deleted the old code:
	g.createACharacter('players', client.sessionId, { x: 200, y: 200, score: 0, ...data });
	// End of the new code.
	// You might have some other code here.
}
```
{% capture code %}
	g.createACharacter('players', client.sessionId, { x: 200, y: 200, score: 0, ...data });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
## 8. Set the player's rotation
  Our next step is to get our character to rotate so that it will always face towards our mouse. To start we will add a [sendAction](/docs/sendAction/) _function_ into the `mousemove` _method_ in our **game.js** file under our `click` _method_.
```javascript
// Click on: code > client > src > game.js

mousemove(x, y) {
	// You might have some other code here.
	// Add this new code below your other code:
	g.sendAction('mousemove', {x, y}); 
	// End of the new code.
}
```
{% capture code %}
	g.sendAction('mousemove', {x, y}); 
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now, we can create a `mousemove` action in **room.js**, we'll put it in the `onMessage` _method_ right under our `click` action. So just like when we added our `click` action we need to add a comma after the last action that was written, which is probably the `click` action. So we write a comma and then hit the return key to start a new line where we write our `mousemove` action.
```javascript
// Click on: code > server > rooms > room.js

onMessage() {
	// There is some code up here.
	const actions = {
		// There is a little bit more code here.
		// Don't forget to add a comma at the end.
		// Add this new code here:
		mousemove: () => {
			// **Empty Space**

		},
		// End of the new code.
	};
}
```
{% capture code %}
		mousemove: () => {

		}, 
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Inside of the brackets in our `mousemove` action we need to change the rotation of our player, and to get the rotation we need in order to follow the mouse, we will use a _function_ called [getRotationTowards](/docs/getRotationTowards/). Then our `mousemove` action will look like this:
```javascript
// Click on: code > server > rooms > room.js

onMessage() {
	// There is some code up here.
	const actions = {
		// There is a little bit more code here.
		mousemove: () => {
			// Add this new code here:
			player.rotation = g.getRotationTowards(player, data.x, data.y);  
			// End of the new code.
		},
	};
}
```
Now our player will always be facing towards the direction of our mouse.

## 9. Add a how to play screen
Now, we are going to make a how to play menu for our game so that anyone who comes on will know how to play our game. To do this we just need to add a _function_ called [useHowToScreen](/docs/useHowToScreen/) in our `create` _method_ in our **game.js** file.
    
```javascript
// Click on: code > client > src > game.js

create() {
	// You might have some other code here.
	// Add this new code below your other code:
	g.useHowToScreen('How to play', {
		'Move Mouse': 'To aim at the zombies',
		'Click Mouse': 'To shoot at the zombies'
	}, {
		'Blobbert': 'Planning/Coding/Fixing',  // Put your team members names
		'Grunch': 'Coding/Testing/Fixing',     // and what jobs you did, down
		'Nimbo': 'Planning/Designing/Testing', // here in the credits!
		// You can find a list of jobs on your handout!
	});
	// End of the new code.
}
```
{% capture code %}
	g.useHowToScreen('How to play', {
		'Move Mouse': 'To aim at the zombies',
		'Click Mouse': 'To shoot at the zombies'
	}, {
		'Blobbert': 'Planning/Coding/Fixing',  // Put your team members names
		'Grunch': 'Coding/Testing/Fixing',     // and what jobs you did, down
		'Nimbo': 'Planning/Designing/Testing', // here in the credits!
		// You can find a list of jobs on your handout!
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
When you write yours, you will need to keep adding to your list of controls, and your contributors until you have added everything needed for your game.

## 10. Create a scoreboard
Next, we're going to create a scoreboard, so that the players can keep track of how many zombies they have killed, and who has killed the most. To do this we need to go into our `create` _method_ in the **game.js** file and change our [getCharacters](/docs/getCharacters/) _function_ for our players to include the [handleLeaderboard](/docs/handleLeaderboard/) _function_. It will be written in as the second, third and fourth _parameters_, so that the scoreboard is updated when a user joins, when their score is updated, and when a user leaves.
```javascript
// Click on: code > client > src > game.js

create() {
	// You might have some other code here.
	// Delete this old code:
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
	// Then add this new code where we deleted the old code:
	g.getCharacters('players',
		(player) => {
			g.handleLeaderboard('players', 'Scoreboard');
			if (player.id === g.myId()) {
				g.cameraFollow(player.sprite);
			}},
		(player) => g.handleLeaderboard('players', 'Scoreboard'),
		(id, attr, value) => {
			if (attr == 'filled' && id == 'filled' &&
				value <= 1 && player.id === g.myId()) {
					location.reload();
				}
			g.handleLeaderboard('players', 'Scoreboard');
		});
	// End of the new code.
	// You might have some other code here.
}
```
{% capture code %}
		g.getCharacters('players',
		(player) => {
			g.handleLeaderboard('players', 'Scoreboard');
			if (player.id === g.myId()) {
				g.cameraFollow(player.sprite);
			}},
		(player) => g.handleLeaderboard('players', 'Scoreboard'),
		(id, attr, value) => {
			if (attr == 'filled' && id == 'filled' &&
				value <= 1 && player.id === g.myId()) {
					location.reload();
				}
			g.handleLeaderboard('players', 'Scoreboard');
		});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now, to get the scoreboard to work we also need to add a couple things in our **room.js** file. First, in our `onUpdate` _method_ in the [handleCollision](/docs/handleCollision/) _method_ for our bullet, and zombie, we need to add a [getACharacter](/docs/getACharacter/) _method_. So we need to go after the [deleteACharacter](/docs/deleteACharacter/) _function_ for the `'bullets'` and hit the return key to create a new line. Then add a [getACharacter](/docs/getACharacter/) _function_ and add one hundred to that _character's_ score on the new line.
```javascript
// Click on: code > server > rooms > room.js

onUpdate(dt) {
	// You might have some other code here.
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
		// Add this new code below your other code:
		g.getACharacter('players', bullet.playerId).score += 100;
		// End of the new code.
	});
	// You might have some other code here.
}
```
{% capture code %}
	g.getACharacter('players', bullet.playerId).score += 100;
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now the scoreboard should be set up and our game is almost finished!

## 11.  Set the Zombies' rotation
The last thing that we are going to do in this tutorial is get the zombies to face towards our _character_. All that we have to do for this is to change our [follow](/docs/follow/) _function_ in our **room.js** file under the `onUpdate` _method_ to include a [getRotationTowards](/docs/getRotationTowards/) _function_, telling our zombies which way to turn. The new _function_ should look like this:
```javascript
// Click on: code > server > rooms > room.js

onUpdate(dt) {
	// You might have some other code here.
	// Delete this old code:
	g.follow('players', 'zombies', 1, 0.1);
	// Then add this new code where we deleted the old code:
	g.follow('players', 'zombies', 1, 0.1,
		(player, zombie) => {
			zombie.rotation = g.getRotationTowards(zombie, player.x, player.y);
		});
	// End of the new code.
	// You might have some other code here.
}
```
{% capture code %}
	g.follow('players', 'zombies', 1, 0.1,
		(player, zombie) => {
			zombie.rotation = g.getRotationTowards(zombie, player.x, player.y);
		});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
And we should now have a fully functioning game! Feel free to customize it and change or add whatever you like!

## 12. Moving forward
{% include blocks/movingForward.md %}

