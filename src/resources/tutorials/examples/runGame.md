---
title: Run Hero
subtitle: Learn how to make a super cool Runner game
tags: [customize]
---
## 1. Follow the build your game tutorial
{% include blocks/gettingStarted.md %}

## 2. Add the background
 First, make sure that you have the image that you want for your background added to your asset folder ([Need Help?](/tutorials/images/)). Then, in the `game.js` file in our `preload` _function_  we'll write a `loadImage` _function_ like this:
```javascript
g.loadImage('background',  'background.png');
```
After that we stay in the `game.js` file and write a `drawBackground` function in our `create ` _function_, which will look like this:<br>
 <img src="../assets/rungame/2.jpg" alt="Example Code">
 <br>Added Code:
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.cameraFollow(player.sprite);
	}
});// Click here and hit enter
// Then add this new line of code:
g.drawBackground( 'background',  3,  500,  2000 );
```
{% capture code %}g.drawBackground( 'background',  3,  500,  2000 );{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

Then we need to go into the `game.js` file and **delete** the `cameraBounds()` method.
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.cameraBounds()
//delete it
```
And change the game width in the top of the  `room.js` file
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
const GAME_WIDTH = 2000;
//change it to this
const GAME_WIDTH = 600;
```
Now we just need to **change** the numbers in our `createACharacter `function in our `onJoin` function in the `room.js` file and add a couple new variables.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.createACharacter('players', client.sessionId,  { x:  200, y:  200, ...data});
//change it to this
g.createACharacter('players', client.sessionId,  { x:  270, y:  1990, safe:  false, speed:  5, spriteName:  "players"  });
```
>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  your game board should be set up!**
## 3. Create Enemies

First, we need to go into the `preload` _function_ in `game.js` and add a new image named after the new character set.
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
preload() {// Click here and hit enter
// Then add this new line of code:
	g.loadImage('enemy',  'enemy.png');
```
{% capture code %}g.loadImage('enemy',  'enemy.png');{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
In the `room.js` file we need to put a `setupCharacters` _function_ in the `onInit` function.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
	g.setupCharacters('players');// Click here and hit enter
	// Then add this new line of code:
	g.setupCharacters('enemy');
```
{% capture code %}g.setupCharacters('enemy');{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then, in the `game.js` file we need to put an `addCharacters` _function_ in the `init` _function_.
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.addCharacters('players', 0.5);// Click here and hit enter
// Then add this new line of code:
g.addCharacters("enemy", .5)
```
{% capture code %}g.addCharacters("enemy", .5){% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
And a getCharacters function in the create function.
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.drawBackground( 'background', 3, 500, 2000 );// Click here and hit enter
// Then add this new line of code:
	g.getCharacters("enemy")
```
{% capture code %}g.getCharacters("enemy"){% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Next, in the `room.js` _file_ in the `onInit` _function_. We’re going to put a `createACharacter` function in a for loop.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.setupCharacters('enemy');// Click here and hit enter
// Then add this new line of code:
	let i;
	for  (i =  0; i <  15; i++)  { g.createACharacter('enemy', g.nextCharacterId('enemy'),  { x: Math.floor((Math.random()  *  500)  +  1), y: Math.floor((Math.random()  *  1900)  +  1)  })  }
```
{% capture code %}let i;
	for  (i =  0; i <  15; i++)  { g.createACharacter('enemy', g.nextCharacterId('enemy'),  { x: Math.floor((Math.random()  *  500)  +  1), y: Math.floor((Math.random()  *  1900)  +  1)  })  }{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able  to  see enemies!**
## 4.  Add enemy movement and collision
To do this we’ll go into our `onUpdate` _function_ in our `room.js` file and add a `handleCollision` _function_ that sends our characters back to the start.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
onUpdate(dt) {// Click here and hit enter
// Then add this new line of code:
g.handleCollision('players',  'enemy',  (player)  =>  {
	if (player.safe === false) {
		player.x =  270;
		player.y =  1980;
	}
});
```
{% capture code %}g.handleCollision('players',  'enemy',  (player)  =>  {
	if (player.safe === false) {
		player.x =  270;
		player.y =  1980;
	}
});{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then,  in the `onUpdate` function in our `room.js` file we put a `getAllCharacters`  _function_. (for our callback function we will set up some if else statements for the movement.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
if (player.safe === false) {
		player.x =  270;
		player.y =  1980;
	}
});// Click here and hit enter
// Then add this new line of code:
g.getAllCharacters('enemy', (enemy, i) => {
	if (enemy.x <= 575 && enemy.right == true) {
		g.move(enemy, 'x', .01 * i + .1);
	}
	else if (enemy.x >= 25) {
		enemy.right = false;
		g.move(enemy, 'x', -.01 * i - .1);
	}
	else {
		enemy.right = true;
	}
});
```
{% capture code %}
g.getAllCharacters('enemy', (enemy, i) => {
	if (enemy.x <= 575 && enemy.right == true) {
		g.move(enemy, 'x', .01 * i + .1);
	}
	else if (enemy.x >= 25) {
		enemy.right = false;
		g.move(enemy, 'x', -.01 * i - .1);
	}
	else {
		enemy.right = true;
	}
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able  to  interact with enemies!**

# 5 set up safe zones and end zone

First, we'll go into our `game.js` file and use an `addLocations` _function_ **above** our `addCharacters` function.
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.setSize(GAME_WIDTH, GAME_HEIGHT);// Click here and hit enter
// Then add this new line of code:
g.addLocations('safeZone');
```
{% capture code %}
g.addLocations('safeZone');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then, still in the `game.js` file in the `create` function we''ll put a  `getLocations` function **above** our `getCharacters` _functions_.
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.useStore('The Store', [
// Add Store Items here!
]);// Click here and hit enter
// Then add this new line of code:
	g.getLocations('safeZone');
```
{% capture code %}
g.getLocations('safeZone');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then we will move into our `room.js` file in our `onInit` _function_ and use a `setupLocations` _function_ **above** our `setupCharacters` _functions_
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.setBounds(GAME_WIDTH, GAME_HEIGHT);// Click here and hit enter
// Then add this new line of code:
g.setupLocations('safeZone');
```
{% capture code %}
g.setupLocations('safeZone');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now we are going to use 3 `createLocations` _functions_ right **under** the `setupLocations` _function_ that we just wrote, to create three different locations on the map.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.setupLocations('safeZone');// Click here and hit enter
// Then add this new line of code:
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  1940, width:  670, height:  100  },  '6cdc00', player =>  {
	player.safe =  true;
});
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  1000, width:  670, height:  100  },  '6cdc00', player =>  {
	player.safe =  true;
});
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  0, width:  670, height:  100  },  '6cdc00', player =>  {
g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players'  });
});
```
{% capture code %}
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  1940, width:  670, height:  100  },  '6cdc00', player =>  {
	player.safe =  true;
});
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  1000, width:  670, height:  100  },  '6cdc00', player =>  {
	player.safe =  true;
});
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  0, width:  670, height:  100  },  '6cdc00', player =>  {
g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players'  });
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now we will go into our `onUpdate` _function_ in the `room.js` file and add a `getAllCharacters` _function_ and a `handleLocations` _function_.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
	else {
		enemy.right = true;
	}
});// Click here and hit enter
// Then add this new line of code:
g.getAllCharacters('players', player =>  { player.safe =  false  })
g.handleLocations('safeZone',  'players');
```
{% capture code %}
g.getAllCharacters('players', player =>  { player.safe =  false  })
g.handleLocations('safeZone',  'players');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now when we make it to the end our players are sent back to the first, later we’ll set up level’s so that we progress every time we make it to the end.
>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able  to  use the safe zones!**
# 6. Set up name tags
To set up a name tag we will go into our `room.js` file and add an `attachTo` _function_  in our onJoin _function_ right after our `createACharacter` _function_.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.createACharacter('players', client.sessionId,  { x:  270, y:  1990, safe:  false, speed:  5, spriteName:  "players"  });// Click here and hit enter
// Then add this new line of code:
g.attachTo('players', client.sessionId,  {
	name:  'nameTag',
	x:  -50,
	y:  -60,
	type:  'text',
	text: data.name
});
```
{% capture code %}
g.attachTo('players', client.sessionId,  {
	name:  'nameTag',
	x:  -50,
	y:  -60,
	type:  'text',
	text: data.name
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
You can change where the name tag is created by changing the x and y values.
>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able  to  use the name tags!**
# 7. Set up scoring

First we need to add  to go to the `room.js` file and put a `setupCharacters` _function_ in the `onInit` _function_.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.setupLocations('safeZone');// Click here and hit enter
// Then add this new line of code:
	g.setupCharacters("team");
```
{% capture code %}
g.setupCharacters("team");
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then, in the `game.js` file we need to put an `addCharacters` _function_ in the `init` _function_.
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.addCharacters("enemy", .5)// Click here and hit enter
// Then add this new line of code:
	g.addCharacters("team")
```
{% capture code %}
g.addCharacters("team")
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
And a `getCharacters` function in the create _function_.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.getCharacters("enemy")// Click here and hit enter
// Then add this new line of code:
	g.getCharacters("team")
```
{% capture code %}
g.getCharacters("team")
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now to get it working, we just need to go into our `room.js` file in the onInit function and use a `createACharacter` _function_ to create our team character.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.setupCharacters("team");// Click here and hit enter
// Then add this new line of code:
g.createACharacter('team',  'team',  { x:  10000, y:  10000, name:  'Level', score:  1  });
```
{% capture code %}
g.createACharacter('team',  'team',  { x:  10000, y:  10000, name:  'Level', score:  1  });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now in the `room.js` file in the `onInit` function in the third `createALocation` function that we wrote, we'll tell the score to up, and the difficulty to increase.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.createALocation('safeZone', g.nextLocationId('safeZone'), { x: -47, y: 0, width: 670, height: 100 }, '6cdc00', player => {// Click here and hit enter
// Then add this new line of code:
let team = g.getACharacter('team',  'team')
team.score +=  1
g.getAllCharacters('enemy', enemy =>  { g.deleteACharacter('enemy', enemy.id)  })
for  (i =  0; i < team.score +  15; i++)  { g.createACharacter('enemy', g.nextCharacterId('enemy'),  { x: Math.floor((Math.random()  *  500)  +  1), y: Math.floor((Math.random()  *  1900)  +  1), right:  true  })  }
```
{% capture code %}
let team = g.getACharacter('team',  'team')
team.score +=  1
g.getAllCharacters('enemy', enemy =>  { g.deleteACharacter('enemy', enemy.id)  })
for  (i =  0; i < team.score +  15; i++)  { g.createACharacter('enemy', g.nextCharacterId('enemy'),  { x: Math.floor((Math.random()  *  500)  +  1), y: Math.floor((Math.random()  *  1900)  +  1), right:  true  })  }
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able to complete levels for score!**
# 8.  Set up Co-op gameplay

First, in the `room.js` file, we'll change the speed in our `onMessage` _function_
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
const speed = 10;// Click here and hit enter
// Then add this new line of code:
const speed = player.speed;
```
{% capture code %}
const speed = player.speed;
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Now, in the `game.js` file in our `preload` _function_ we add a new image. First make sure you have the image in your asset folder ([Need Help?](/tutorials/images/)).
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
preload() {// Click here and hit enter
// Then add this new line of code:
g.loadImage('grave',  'Grave.png')
```
{% capture code %}
g.loadImage('grave',  'Grave.png')
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then, we need to **change** our `handleCollision` _function_ for players and enemies in the `onUpdate` _function_ in the `room.js` file.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.handleCollision('players',  'enemy',  (player)  =>  {
	if (player.safe === false) {
		player.x =  270;
		player.y =  1980;
	}
});
//Change it to this code:
g.handleCollision('players',  'enemy',  (player)  =>  {
	if  (player.safe ==  false)  {
		player.spriteName =  "grave";
		player.speed =  0;
		let result =  true;
		g.getAllCharacters('players', player =>  {
		if  (player.speed ==  5)  {
			result =  false;
		}
	})
	if  (result ==  true)  {
		g.getACharacter('team',  'team').score =  1;
		g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players', player.speed =  5  });
	}
	}
});
```
{% capture code %}
g.handleCollision('players',  'enemy',  (player)  =>  {
	if  (player.safe ==  false)  {
		player.spriteName =  "grave";
		player.speed =  0;
		let result =  true;
		g.getAllCharacters('players', player =>  {
		if  (player.speed ==  5)  {
			result =  false;
		}
	})
	if  (result ==  true)  {
		g.getACharacter('team',  'team').score =  1;
		g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players', player.speed =  5  });
	}
	}
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Then we'll add a `handleCollision` _function_ for our players. We will put this in a `setTimeout` _function_. This will be written in our `onUpdate` _function_ in the `room.js` file.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
		g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players', player.speed =  5  });
	}
	}
});// Click here and hit enter
// Then add this new line of code:
setTimeout(function  ()  { g.handleCollision('players',  'players',  (player1)  =>  {  if  (player1.speed ==  0)  { player1.speed =  5, player1.spriteName =  'players'  }  })  },  500);
```
{% capture code %}
setTimeout(function  ()  { g.handleCollision('players',  'players',  (player1)  =>  {  if  (player1.speed ==  0)  { player1.speed =  5, player1.spriteName =  'players'  }  })  },  500);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
And we should now have a fully functioning game! Feel free to customize it and change or add whatever you like!
>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able to save your friends if they get hit!**

# *Bonus
If you want to change your character image with each level you complete you can do this last step.

The first thing we will need to do is add 20 images into our `preload` _function_ and name them accordingly:
```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
preload(){

g.loadImage('player1', 'player1.png');
g.loadImage('player2', 'player2.png');
g.loadImage('player3', 'player3.png');
g.loadImage('player4', 'player4.png');
g.loadImage('player5', 'player5.png');
g.loadImage('player6', 'player6.png');
g.loadImage('player7', 'player7.png');
g.loadImage('player8', 'player8.png');
g.loadImage('player9', 'player9.png');
g.loadImage('player10', 'player10.png');
g.loadImage('player11', 'player11.png');
g.loadImage('player12', 'player12.png');
g.loadImage('player13', 'player13.png');
g.loadImage('player14', 'player14.png');
g.loadImage('player15', 'player15.png');
g.loadImage('player16', 'player16.png');
g.loadImage('player17', 'player17.png');
g.loadImage('player18', 'player18.png');
g.loadImage('player19', 'player19.png');
g.loadImage('player20', 'player20.png');
```
Then, we will go into our `room.js` file into our `onUpdate` _function_ and change our `setTimeout` _function_ to look like this
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
setTimeout(function () { g.handleCollision('players', 'players', (player1) => { if (player1.speed == 0) { player1.speed = 5; player1.spriteName = `players` } }) }, 500);
//change it to this
g.handleCollision('players', 'players', (player1) => { if (player1.speed == 0) { player1.speed = 5; player1.spriteName = `player${g.getACharacter('team', 'team').score}` } }) }, 500);
```
Then we'll change the `getAllCharacters` _function_ that's inside of the if statement in our `onUpdate` _function_.
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.getAllCharacters('players', player  => { player.x = 270; player.y = 1990; player.spriteName = `players`; player.speed = 5 });
//change it to this
g.getAllCharacters('players', player  => { player.x = 270; player.y = 1990; player.spriteName = `player${g.getACharacter('team', 'team').score}`; player.speed = 5 });
```
Then we'll change the `createACharacter` _function_ in our `onJoin` _function_ to look like this:
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.createACharacter('players', client.sessionId, { width:  75, height:  75, x:  270, y:  1990, safe:  false, speed:  5, spriteName:  `players` });
// change it to this
g.createACharacter('players', client.sessionId, { width:  75, height:  75, x:  270, y:  1990, safe:  false, speed:  5, spriteName:  `player${g.getACharacter('team', 'team').score}` });
```
Then we'll change the first `getAllCharacters` in our `createALocation` _function_ in the `onInit` _function_ to look like this:
```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
g.getAllCharacters('players', player  => { player.x = 270; player.y = 1990; player.spriteName = `players` });
//change it to this
g.getAllCharacters('players', player  => { player.x = 270; player.y = 1990; player.spriteName = `player${team.score}` });
```
>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able  to  change your character's image every level!**

## 9. Moving forward
{% include blocks/movingForward.md %}
