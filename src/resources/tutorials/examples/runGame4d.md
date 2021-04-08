# 4. Set Up Safe Zones

(Step 4/5) To Set up safe zones and an end zone.

##### 4. In `room.js`, Use 3 `createLocations` _functions_ right **under** the `setupLocations` _function_ that we just wrote, to create three different locations on the map.

<iframe width="560" height="315" src="https://www.youtube.com/embed/BD4Gdtoz7-I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```javascript
// File: code/server/rooms/room.js
// Copy
[0, 1000, 1940].forEach(y => {
    g.createALocation('safeZone', g.nextLocationId('safeZone'),
        { x: -47, y, width: 670, height: 1000 },
        '6cdc00', player => { player.safe = true });
});
// End Copy
onInit() {
    g.setup(this);
    g.setBounds(GAME_WIDTH, GAME_HEIGHT);
    g.setupLocations('safeZone');/*[*/
    [0, 1000, 1940].forEach(y => {
        g.createALocation('safeZone', g.nextLocationId('safeZone'),
            { x: -47, y, width: 670, height: 1000 },
            '6cdc00', player => { player.safe = true });
    });/*]*/
    g.setupCharacters('players');
    g.setupCharacters('enemy');
```
