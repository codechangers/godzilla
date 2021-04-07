
# 3. Add Enemy Movement
 (Step 1/2) To Learn how to make enemies move and recognize collision.

#### 1. Go into our `onUpdate` _function_ in our `room.js` file and add a `handleCollision` _function_ that sends our characters back to the start.

<iframe width="560" height="315" src="https://www.youtube.com/embed/nGpu4sZiAQA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```
// File: code/client/src/game.js
g.handleCollision('players',  'enemy',  (player)  =>  {
	if (player.safe === false) {
		player.x =  270;
		player.y =  1980;
	}
});
```
