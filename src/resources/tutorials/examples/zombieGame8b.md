# 1 Set Players Rotation
 (Step 2/3)

##### 2. In `room.js`, create a `mousemove` action under the `click` action.

```javascript
// File: code/server/rooms/room.js
// Copy
mousemove: () => {
	player.rotation = g.getRotationTowards(player, data.x, data.y); 
},
// End Copy
/*[*/mousemove: () => {
	player.rotation = g.getRotationTowards(player, data.x, data.y); 
},/*]*/
```

Inside of the brackets in our `mousemove` action has the code to change the rotation of our player to follow the mouse.

Now our player will always be facing towards the direction of our mouse.
