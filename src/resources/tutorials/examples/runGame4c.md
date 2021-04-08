# 4. Set Up Safe Zones

(Step 3/5) To Set up safe zones and an end zone.

##### 3. In `room.js` file in our `onInit` _function_ we'll use a `setupLocations` _function_ **above** our `setupCharacters` _functions_

<iframe width="560" height="315" src="https://www.youtube.com/embed/Tqm1HhXyGBI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```javascript
// File: code/server/rooms/room.js
// Copy
g.setupLocations('safeZone');
// End Copy
onInit() {
    g.setup(this);
    g.setBounds(GAME_WIDTH, GAME_HEIGHT);/*[*/
    g.setupLocations('safeZone');/*]*/
    g.setupCharacters('players');
    g.setupCharacters('enemy');
    for (let i = 0; i < 15; i++) {
        g.createACharacter('enemy', g.nexCharacterId('enemy'), {
            x: Math.floor(Math.random() * 500) + 1,
            y: Math.floor(Math.random() * 1900) + 1,
        });
    }
}
```
