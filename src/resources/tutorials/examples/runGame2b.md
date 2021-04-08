# 2. Create Enemies
(Step 2/5) To Learn how to add enenies into your game.

##### 2. In the `room.js` file we need to put a `setupCharacters` _function_ in the `onInit` function.

<iframe width="560" height="315" src="https://www.youtube.com/embed/EjEw4HeAMdM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```
// File: code/server/rooms/room.js
// Copy 
g.setupCharacters('enemy');
// End Copy
g.setupCharacters('players');
/*[*/g.setupCharacters('enemy');/*]*/
}
```