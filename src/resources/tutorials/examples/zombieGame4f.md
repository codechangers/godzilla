# 1 Add Zombies
 (Step 6/7)

##### 6. In `room.js`, add the `follow()` function inside the `onUpdate()` function so that zombies will follow you.
``` javascript
// File: code/server/rooms/room.js
// Copy
g.follow('players', 'zombies', 1, 0.1);
// End Copy
onUpdate(dt) {
	/*[*/g.follow('players', 'zombies', 1, 0.1);/*]*/
}

```

> **You can change the numbers to change the distance the zombies will come to your character, and the speed of the zombies.**
