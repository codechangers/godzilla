# 6. Set up Scoring

(Step 5/5) To Set up a scoring system.

##### 5. In the `room.js` file in the `onInit` function in the third `createALocation` function that we wrote, we'll tell the score to up, and the difficulty to increase.

```javascript
// File: code/server/rooms/room.js
// Copy
let team = g.getACharacter('team', 'team');
team.score += 1;
g.getAllCharacters('enemy', enemy => { g.deleteACharacter('enemy', enemy.id) });
for (let i = 0; i < team.score + 15; i++) {
   g.createACharacter('enemy', g.nextCharacterId('enemy'), {
      x: Math.floor(Math.random() * 500) + 1,
      y: Math.floor(Math.random() * 1900) + 1,
      right: true,
   });
}
// End Copy
   g.setupCharacters('team');
   g.setupCharacters('enemy');
   g.createACharacter('team', 'team', { x: 10000, y: 10000, name: 'Level', score: 1 });/*[*/
   let team = g.getACharacter('team', 'team');
   team.score += 1;
   g.getAllCharacters('enemy', enemy => { g.deleteACharacter('enemy', enemy.id) });/*]*/
   for (let i = 0; i </*[*/ team.score +/*]*/ 15; i++) {
      g.createACharacter('enemy', g.nextCharacterId('enemy'), {
         x: Math.floor(Math.random() * 500) + 1,
         y: Math.floor(Math.random() * 1900) + 1,/*[*/
         right: true,/*]*/
      });
   }
```
