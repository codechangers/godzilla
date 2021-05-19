# Soccer Game - 6.A

## Add kicking to the game.

**(Step 1/4)** Set character shape types to circles.

### Set characters to circles.

In `room.js` we need to change our `setupCharacters` _functions_ to say that our characters are circles.

You only need to do this for the images you added that are circular. So for example, if you have a circle ball and square players, you should add the circle code to the ball, but **do not** add it to the player.

```javascript
// File: room.js
// Copy
g.setupCharacters('players', 'circle');
g.setupCharacters('goals', 'circle');
g.setupCharacters('soccerBalls', 'circle');
// End Copy
onInit() {
	g.setup(this);
	g.setBounds(GAME_WIDTH, GAME_HEIGHT);
	g.setupCharacters('players'/*[*/, 'circle'/*]*/);
	g.setupCharacters('goals'/*[*/, 'circle'/*]*/);
	g.setupCharacters('soccerBalls'/*[*/, 'circle'/*]*/);
}
```
