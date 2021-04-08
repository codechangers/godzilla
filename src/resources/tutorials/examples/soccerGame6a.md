# 6. Adding Kicking

Step (1/4) To add Kicking to your game. 

##### 1. In `room.js`, Change the `setupCharacters` functions to be circles.

```
// File: code/server/rooms/room.js
// Copy
	g.setupCharacters('players', 'circle');
	g.setupCharacters('goals', 'circle');
	g.setupCharacters('soccerBalls', 'circle');
// End Copy
	/*[*/g.setupCharacters('players', 'circle');
	g.setupCharacters('goals', 'circle');
	g.setupCharacters('soccerBalls', 'circle');/*]*/
```