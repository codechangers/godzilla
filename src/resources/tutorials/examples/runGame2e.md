# 2. Create Enemies
(Step 5/5) To Learn how to add enenies into your game.

##### 5. In the `room.js` _file_ in the `onInit` _function_. We’re going to put a `createACharacter` function in a for loop.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PE0gKJDuDw0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```
// File: code/server/rooms/room.js
// Copy 
let i;
for  (i =  0; i <  15; i++)  { g.createACharacter('enemy', g.nextCharacterId('enemy'),  { x: Math.floor((Math.random()  *  500)  +  1), y: Math.floor((Math.random()  *  1900)  +  1)  })  }
// End Copy
  g.setupCharacters('enemy');
/*[*/let i;
for  (i =  0; i <  15; i++)  { g.createACharacter('enemy', g.nextCharacterId('enemy'),  { x: Math.floor((Math.random()  *  500)  +  1), y: Math.floor((Math.random()  *  1900)  +  1)  })  }/*]*/
  }
```