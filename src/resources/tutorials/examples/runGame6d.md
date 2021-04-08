# 6. Set up Scoring
 (Step 4/5) To Set up a scoring system.

##### 4. Go into our `room.js` file in the onInit function and use a `createACharacter` _function_ to create our team character.

```javascript
// File: code/server/rooms/room.js
// Copy
g.createACharacter('team', 'team', { x: 10000, y: 10000, name: 'Level', score: 1 });
// End Copy
    [0, 1000, 1940].forEach(y => {
        g.createALocation('safeZone', g.nextLocationId('safeZone'),
            { x: -47, y, width: 670, height: 1000 },
            '6cdc00', player => { player.safe = true });
    });
    g.setupCharacters('players');
    g.setupCharacters('team');
    g.setupCharacters('enemy');/*[*/
    g.createACharacter('team', 'team', { x: 10000, y: 10000, name: 'Level', score: 1 });/*]*/
    for (let i = 0; i < 15; i++) {
        g.createACharacter('enemy', g.nextCharacterId('enemy'), {
            x: Math.floor(Math.random() * 500) + 1,
            y: Math.floor(Math.random() * 1900) + 1,
        });
    }
```
