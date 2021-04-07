# 1 Setup Bullets
 (Step 9/10)

##### 9. In `room.js`, Add code to handle the collision and delete the zombies if they collide with the bullets in the `onUpdate()` function.

``` javascript
// File: code/server/rooms/room.js
g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
	g.deleteACharacter('zombies', zombie.id);
	g.deleteACharacter('bullets', bullet.id);
});
```

Now you should have working bullets that can kill the zombies when you shoot!
