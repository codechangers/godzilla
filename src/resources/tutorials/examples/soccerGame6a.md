# 6. Adding Kicking

Step (1/4) To add Kicking to your game. 

##### 1. In `room.js`, Change the `setupCharacters` functions to be circles.

```javascript
// File: code/server/rooms/room.js
// Copy
<<<<<<< HEAD
	g.setupCharacters('players', 'circle');
	g.setupCharacters('goals', 'circle');
	g.setupCharacters('soccerBalls', 'circle');
=======
g.setupCharacters('players', 'circle');
g.setupCharacters('goals', 'circle');
g.setupCharacters('soccerBalls', 'circle');
>>>>>>> fa7d7d93150f6a5493d35bea168bbdb1a0bdc6e8
// End Copy
onInit() {
	g.setup(this);
	g.setBounds(GAME_WIDTH, GAME_HEIGHT);
	g.setupCharacters('players'/*[*/, 'circle'/*]*/);
	g.setupCharacters('goals'/*[*/, 'circle'/*]*/);
	g.setupCharacters('soccerBalls'/*[*/, 'circle'/*]*/);
}
```