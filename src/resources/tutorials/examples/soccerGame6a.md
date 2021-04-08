# 6. Adding Kicking

Step (1/4) To add Kicking to your game. 

##### 1. In `room.js`, Change the `setupCharacters` functions to be circles.

```javascript
// File: code/server/rooms/room.js
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