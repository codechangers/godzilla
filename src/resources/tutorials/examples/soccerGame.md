# Soccer Game

Learn how to create an awesome online soccer game!

## 1. Follow the build your game tutorial

{% include blocks/gettingStarted.md %}

## 2. Background

_2.1_ The first thing we are going to do is upload a background image for our game ([Need Help?](/tutorials/images/)).

_2.2_ Then we will load the image into the game.

```javascript
// File: code/client/src/game.js
// Copy
g.loadImage('background', 'grass.jpg');
// End Copy
preload() {
	g.loadImage('players', 'logo.png');/*[*/
	g.loadImage('background', 'grass.jpg');/*]*/
}
```

_2.3_ After that we will draw the background.

```javascript
// File: code/client/src/game.js
// Copy
g.drawBackground('background', 0.8);
// End Copy
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});/*[*/
	g.drawBackground('background', 0.8);/*]*/
}
```

{% capture code %}
g.drawBackground('background', 0.8);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**

## 3. Players

_3.1_ We are going to add some character options. The first thing we need to do is upload all of our character images ([Need Help?](/tutorials/images/)).

_3.2_ We need to set the players default image.

```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.loadImage('players', 'logo.png');
// And change it to say:
g.loadImage('players', 'circle1.png');
```

{% capture code %}
g.loadImage('players', 'circle1.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_3.3_ Then we will load all of the new images.

```javascript
// In the same file, game.js

// In the same spot:
	g.loadImage('players', 'circle1.png');
	g.loadImage('background', 'grass.jpg'); // Click here and hit enter
// Then add these new lines of code:
	g.loadImage('blobbert', 'circle1.png');
	g.loadImage('grunch', 'circle2.png');
	g.loadImage('neon', 'circle3.png');
	g.loadImage('nimbo', 'circle4.png');
	g.loadImage('tangles', 'circle5.png');
// End of the new code
}
```

{% capture code %}
g.loadImage('blobbert', 'circle1.png');
g.loadImage('grunch', 'circle2.png');
g.loadImage('neon', 'circle3.png');
g.loadImage('nimbo', 'circle4.png');
g.loadImage('tangles', 'circle5.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_3.4_ Next we need to add a player select screen.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
	g.useLoginScreen((name) => g.connect({ name }));  // Click here and hit enter
// Then add these new lines of code:
	g.usePlayerSelectScreen({
		blobbert: 'circle1.png',
		grunch: 'circle2.png',
		neon: 'circle3.png',
		nimbo: 'circle4.png',
		tangles: 'circle5.png',
	});
// End of the new code
	g.useHowToScreen('How to play', {
```

{% capture code %}
g.usePlayerSelectScreen({
blobbert: 'circle1.png',
grunch: 'circle2.png',
neon: 'circle3.png',
nimbo: 'circle4.png',
tangles: 'circle5.png',
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_3.5_ After that we need to send the player's choice to the server.

```javascript
// In the same file, game.js

// In the same spot:
// Change this code:
g.useLoginScreen(name => g.connect({ name }));
// And make it say this:
g.useLoginScreen((name, spriteName) => g.connect({ name, spriteName }));
```

{% capture code %}
g.useLoginScreen((name, spriteName) => g.connect({ name, spriteName }));
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to choose your character!**

## 4. Goals

_4.1_ We need to add the goals characters.

```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
	g.addCharacters('players', 0.6);  // Click here and hit enter
// Then add this new line of code:
	g.addCharacters('goals', 0.6);
}
```

{% capture code %}
g.addCharacters('goals', 0.6);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_4.2_ Then we need to upload a goal image ([Need Help?](/tutorials/images/)).

_4.3_ Next we need to load the goal image.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
	g.loadImage('tangles', 'circle5.png'); // Click here and hit enter
// Then add this new line of code:
	g.loadImage('goals', 'goal.png');
}
```

{% capture code %}
g.loadImage('goals', 'goal.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_4.4_ Then we need to set the player depth.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
g.getCharacters('players', player => {
  // Click here and hit enter
  // Then add this new line of code:
  player.sprite.depth = 5;
  if (player.id === g.myId()) {
    g.cameraFollow(player.sprite);
  }
});
```

{% capture code %}
player.sprite.depth = 5;
if (player.id === g.myId()) {
g.cameraFollow(player.sprite);
}
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_4.5_ We also need to get the goals.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
g.drawBackground('background', 0.8); // Click here and hit enter
// Then add this new line of code:
g.getCharacters('goals');
```

{% capture code %}
g.getCharacters('goals');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_4.6_ In our server code we need to setup the goals.

```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
	g.setupCharacters('players'); // Click here and hit enter
// Then add this new line of code:
	g.setupCharacters('goals');
}
```

{% capture code %}
g.setupCharacters('goals');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_4.7_ Then we need to create each player's goal.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
g.createACharacter('players', client.sessionId, { x, y, ...data }); // Click here and hit enter
// Then add this new line of code:
g.createACharacter('goals', client.sessionId, { x, y });
```

{% capture code %}
g.createACharacter('goals', client.sessionId, { x, y });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_4.8_ Finally we need to delete a goal when someone leaves.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
onLeave(client) {
	g.deleteACharacter('players', client.sessionId); // Click here and hit enter
// Then add this new line of code:
	g.deleteACharacter('goals', client.sessionId);
}
```

{% capture code %}
g.deleteACharacter('goals', client.sessionId);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and each player should now have a goal!**

## 5. Soccer Balls

_5.1_ First we need to upload the picture of our soccer ball ([Need Help?](/tutorials/images/)).

_5.2_ Then we need to setup the soccer ball characters.

```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
	g.addCharacters('goals', 0.6); // Click here and hit enter
// Then add this new line of code:
	g.addCharacters('soccerBalls', 0.2);
}
```

{% capture code %}
g.addCharacters('soccerBalls', 0.2);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_5.3_ Next we need to load the soccer ball image.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
	g.loadImage('goals', 'goal.png'); // Click here and hit enter
// Then add this new line of code:
	g.loadImage('soccerBalls', 'ball.png');
}
```

{% capture code %}
g.loadImage('soccerBalls', 'ball.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_5.4_ Finally we need to get the soccer balls.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
	g.getCharacters('goals'); // Click here and hit enter
// Then add this new line of code:
	g.getCharacters('soccerBalls');
}
```

{% capture code %}
g.getCharacters('soccerBalls');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_5.5_ In our server code we need to setup the soccer balls.

```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
	g.setupCharacters('goals'); // Click here and hit enter
// Then add this new line of code:
	g.setupCharacters('soccerBalls');
}
```

{% capture code %}
g.setupCharacters('soccerBalls');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_5.6_ Then we need to add a ball.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
g.createACharacter('goals', client.sessionId, { x, y }); // Click here and hit enter
// Then add these new lines of code:
this.addABall();
```

{% capture code %}
this.addABall();
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_5.7_ Finally we need to create one ball for every two players.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
	g.handleActions(actions, data);
}
// Click on the empty line and press enter
// Then add these new lines of code:
addABall() {
	const playersPerBall = 2;
	const numOf = (t) => Object.keys(this.state[t]).length;
	if (
		numOf('players') % playersPerBall === 0 &&
		numOf('soccerBalls') < numOf('players') / playersPerBall
	) {
		g.createACharacter('soccerBalls',
			g.nextCharacterId('soccerBalls'), {
				x: GAME_WIDTH / 2,
				y: GAME_HEIGHT / 2,
			});
	}
} // Click here and hit enter
// End of the new code
onUpdate(dt) {
```

{% capture code %}
addABall() {
const playersPerBall = 2;
const numOf = (t) => Object.keys(this.state[t]).length;
if (
numOf('players') % playersPerBall === 0 &&
numOf('soccerBalls') < numOf('players') / playersPerBall
) {
g.createACharacter('soccerBalls',
g.nextCharacterId('soccerBalls'), {
x: GAME_WIDTH / 2,
y: GAME_HEIGHT / 2,
});
}
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and a soccer ball should appear once 2 players join!**

## 6. Kick the ball

_6.1_ The first thing we need to do is set all of our characters as circles.

```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see these lines of code:
g.setupCharacters('players');
g.setupCharacters('goals');
g.setupCharacters('soccerBalls');
// Then change them to:
g.setupCharacters('players', 'circle');
g.setupCharacters('goals', 'circle');
g.setupCharacters('soccerBalls', 'circle');
```

{% capture code %}
g.setupCharacters('players', 'circle');
g.setupCharacters('goals', 'circle');
g.setupCharacters('soccerBalls', 'circle');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_6.2_ After that we need to do is add some values to our soccerBalls.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
			g.nextCharacterId('soccerBalls'), {
				x: GAME_WIDTH / 2,
				y: GAME_HEIGHT / 2, // Click here and hit enter
			// Then add these new lines of code:
				dx: 0,
				dy: 0,
			// End of the new code
			});
```

{% capture code %}
dx: 0,
dy: 0,
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_6.3_ Next we need to make the soccerBalls move based on those values.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
onUpdate(dt) {
// Then add these new lines of code:
	const friction = (dv) => dv > -0.01 && dv < 0.01 ? 0 : dv - dv / 6000;
	g.getAllCharacters('soccerBalls', (ball) => {
		g.move(ball, 'x', ball.dx);
		g.move(ball, 'y', ball.dy);
		const bounceX = (ball.x <= ball.width / 2 ||
			ball.x >= GAME_WIDTH - ball.width / 2) ? -1 : 1;
		const bounceY = (ball.y <= ball.height / 2 ||
			ball.y >= GAME_HEIGHT - ball.height / 2) ? -1 : 1;
		ball.dx = bounceX * friction(ball.dx);
		ball.dy = bounceY * friction(ball.dy);
	});
// End of the new code
}
```

{% capture code %}
const friction = (dv) => dv > -0.01 && dv < 0.01 ? 0 : dv - dv / 6000;
g.getAllCharacters('soccerBalls', (ball) => {
g.move(ball, 'x', ball.dx);
g.move(ball, 'y', ball.dy);
const bounceX = (ball.x <= ball.width / 2 ||
ball.x >= GAME*WIDTH - ball.width / 2) ? -1 : 1;
const bounceY = (ball.y <= ball.height / 2 ||
ball.y >= GAME_HEIGHT - ball.height / 2) ? -1 : 1;
ball.dx = bounceX * friction(ball.dx);
ball.dy = bounceY \_ friction(ball.dy);
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_6.4_ After that, we need to set the values when we kick the ball.

```javascript
// In the same file, room.js

// Right after the code we just added:
		ball.dy = friction(ball.dy);
	}); // Click here and hit enter
// Then add these new lines of code:
	g.handleCollision('players', 'soccerBalls', (player, ball) => {
		ball.dx = g.getXTowards(player, ball.x, ball.y);
		ball.dy = g.getYTowards(player, ball.x, ball.y);
	});
// End of the new code
}
```

{% capture code %}
g.handleCollision('players', 'soccerBalls', (player, ball) => {
ball.dx = g.getXTowards(player, ball.x, ball.y);
ball.dy = g.getYTowards(player, ball.x, ball.y);
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to kick the soccer ball!**

## 7. Score a goal

_7.1_ First we need to add data to the players.

```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this line of code:
g.createACharacter('players', client.sessionId, { x, y, ...data });
// And change it to say this:
g.createACharacter('players', client.sessionId, {
  ...data,
  x,
  y,
  score: 0,
  lives: 3,
  block3s: 0,
  block5s: 0
});
```

{% capture code %}
g.createACharacter('players', client.sessionId,
{ ...data, x, y, score: 0, lives: 3, block3s: 0, block5s: 0 });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_7.2_ Then we need to add a kicker to the ball.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
g.createACharacter('soccerBalls', g.nextCharacterId('soccerBalls'), {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2,
  dx: 0,
  dy: 0, // Click here and hit enter
  // Then add this new line of code:
  kicker: ''
});
```

{% capture code %}
kicker: '',
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_7.3_ Next we need to keep track of who kicked the ball last.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
g.handleCollision('players', 'soccerBalls', (player, ball) => {
  ball.dx = g.getXTowards(player, ball.x, ball.y);
  ball.dy = g.getYTowards(player, ball.x, ball.y); // Click here and hit enter
  // Then add this new line of code:
  ball.kicker = player.id;
});
```

{% capture code %}
ball.kicker = player.id;
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_7.4_ Next we need to update the lives and scores when a goal is made.

```javascript
// In the same file, room.js

// In the same spot:
		ball.dy = g.getYTowards(player, ball.x, ball.y);
		ball.kicker = player.id;
	}); // Click here and hit enter
// Then add these new lines of code:
	g.handleCollision('goals', 'soccerBalls', (goal, ball) => {
		if (ball.kicker !== goal.id) {
			g.getACharacter('players', ball.kicker).score += 1;
			g.getACharacter('players', goal.id).lives -= 1;
			g.deleteACharacter('soccerBalls', ball.id);
			setTimeout(() => this.addABall(), 3000);
		}
	});
// End of the new code
}
```

{% capture code %}
g.handleCollision('goals', 'soccerBalls', (goal, ball) => {
if (ball.kicker !== goal.id) {
g.getACharacter('players', ball.kicker).score += 1;
g.getACharacter('players', goal.id).lives -= 1;
g.deleteACharacter('soccerBalls', ball.id);
setTimeout(() => this.addABall(), 3000);
}
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_7.5_ Finally we need to add a game over check.

```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.getCharacters(
  'players',
  player => {
    player.sprite.depth = 5;
    if (player.id === g.myId()) {
      g.cameraFollow(player.sprite);
    } // Click here and hit enter
    // Then add these new lines of code:
  },
  () => {},
  (id, attr, value) => {
    if (id === g.myId() && attr === 'lives' && value <= 0) {
      location.reload();
    }
    // End of the new code
  }
);
```

{% capture code %}
},
() => {},
(id, attr, value) => {
if (id === g.myId() && attr === 'lives' && value <= 0) {
location.reload();
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to score goals!**

## 8. Block Shop

_8.1_ First we need to upload pictures of our blocks ([Need Help?](/tutorials/images/)).

_8.2_ Then we need to create our store items.

```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
g.useStore('Block Shop', [
  // Add Store Items here! // Click here and hit enter
  // Then add these new lines of code:
  new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
  new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5')
  // End of the new code
]);
```

{% capture code %}
new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5'),
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_8.3_ Next we need to create the buy actions.

```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this code:
const actions = {
  moveUp: () => g.move(player, 'y', -speed),
  moveDown: () => g.move(player, 'y', speed),
  moveLeft: () => g.move(player, 'x', -speed),
  moveRight: () => g.move(player, 'x', speed), // Click here and hit enter
  // Then add these new lines of code:
  buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
  buy5: () => g.purchase(player, 'score', 4, 'block5s', 1)
  // End of the new code
};
```

{% capture code %}
buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to buy blocks!**

## 9. Place blocks

_9.1_ First we need to add block characters.

```javascript
// In repl click on: code > client > src > game.js

// Scroll down until you see this code:
	g.addCharacters('soccerBalls', 0.2); // Click here and hit enter
// Then add this new line of code:
	g.addCharacters('blocks', 0.5);
}
```

{% capture code %}
g.addCharacters('blocks', 0.5);
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_9.2_ Then we need to load our block images.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
	g.loadImage('soccerBalls', 'ball.png'); // Click here and hit enter
// Then add these new lines of code:
	g.loadImage('block1', 'block1.png');
	g.loadImage('block2', 'block2.png');
	g.loadImage('block3', 'block3.png');
	g.loadImage('block4', 'block4.png');
	g.loadImage('block5', 'block5.png');
// End of the new code
}
```

{% capture code %}
g.loadImage('block1', 'block1.png');
g.loadImage('block2', 'block2.png');
g.loadImage('block3', 'block3.png');
g.loadImage('block4', 'block4.png');
g.loadImage('block5', 'block5.png');
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_9.3_ Next we need to get our blocks.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
	g.getCharacters('soccerBalls'); // Click here and hit enter
// Then add this new line of code:
	g.getCharacters('blocks');
}
```

{% capture code %}
g.getCharacters('blocks');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_9.4_ We also need to place a block when we click.

```javascript
// In the same file, game.js

// Scroll down until you see this code:
click(x, y) {
// Click on the empty line
// Then add these new lines of code:
	if (g.canSend()) {
		g.sendAction('placeBlock', {x, y});
	}
// End of the new code
}
```

{% capture code %}
if (g.canSend()) {
g.sendAction('placeBlock', {x, y});
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_9.5_ Then we need to setup the blocks.

```javascript
// In repl click on: code > server > rooms > room.js

// Scroll down until you see this line of code:
	g.setupCharacters('goals', 'circle');
	g.setupCharacters('soccerBalls', 'circle'); // Click here and hit enter
// Then add this new line of code:
	g.setupCharacters('blocks');
}
```

{% capture code %}
g.setupCharacters('blocks');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_9.6_ After that we need to add the blocks into the game.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
	buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
	buy5: () => g.purchase(player, 'score', 4, 'block5s', 1), // Click here and hit enter
// Then add these new lines of code:
	placeBlock: ({ x, y }) => {
		if (player.block5s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 5, spriteName: 'block5'});
		} else if (player.block3s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 3, spriteName: 'block3'});
		}
	},
// End of the new code
};
```

{% capture code %}
placeBlock: ({ x, y }) => {
if (player.block5s > 0) {
g.createACharacter('blocks', g.nextCharacterId('blocks'),
{x, y, health: 5, spriteName: 'block5'});
} else if (player.block3s > 0) {
g.createACharacter('blocks', g.nextCharacterId('blocks'),
{x, y, health: 3, spriteName: 'block3'});
}
},
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

_9.7_ Finally we need to have the ball run into the blocks.

```javascript
// In the same file, room.js

// Scroll down until you see this code:
			g.deleteACharacter('soccerBalls', ball.id);
			setTimeout(() => this.addABall(), 3000);
		}
	}); // Click here and hit enter
// Then add these new lines of code:
	g.handleCollision('soccerBalls', 'blocks', (ball, block) => {
		ball.dx = g.getXTowards(block, ball.x, ball.y);
		ball.dy = g.getYTowards(block, ball.x, ball.y);
		const bh = block.health - 1;
		if (bh > 0) {
			block.health = bh;
			block.spriteName = `block${bh}`;
		} else {
			g.deleteACharacter('blocks', block.id);
		}
	});
// End of the new code
}
```

{% capture code %}
g.handleCollision('soccerBalls', 'blocks', (ball, block) => {
ball.dx = g.getXTowards(block, ball.x, ball.y);
ball.dy = g.getYTowards(block, ball.x, ball.y);
const bh = block.health - 1;
if (bh > 0) {
block.health = bh;
block.spriteName = `block${bh}`;
} else {
g.deleteACharacter('blocks', block.id);
}
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to place down blocks!**

## 10. Moving forward

{% include blocks/movingForward.md %}
