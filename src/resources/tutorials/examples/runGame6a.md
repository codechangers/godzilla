# 6. Set up Scoring

(Step 1/5) To Set up a scoring system.

##### 1. Go to the `room.js` file and put a `setupCharacters` _function_ in the `onInit` _function_.

```javascript
// File: code/client/src/game.js
// Copy
g.setupCharacters('team');
// End Copy
    [0, 1000, 1940].forEach(y => {
        g.createALocation('safeZone', g.nextLocationId('safeZone'),
            { x: -47, y, width: 670, height: 1000 },
            '6cdc00', player => { player.safe = true });
    });
    g.setupCharacters('players');/*[*/
    g.setupCharacters('team');/*]*/
    g.setupCharacters('enemy');
    for (let i = 0; i < 15; i++) {
        g.createACharacter('enemy', g.nextCharacterId('enemy'), {
            x: Math.floor(Math.random() * 500) + 1,
            y: Math.floor(Math.random() * 1900) + 1,
        });
    }
```
