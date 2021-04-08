# 4. Set Up Safe Zones
(Step 2/5) To Set up safe zones and an end zone.

##### 2. In the `game.js` file in the `create` function we''ll put a  `getLocations` function **above** our `getCharacters` _functions_.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Tkl6o1Z88P0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```javascript
// File: code/client/src/game.js
// Copy 
g.getLocations('safeZone');
// End Copy
      // Add Store Items here!
    ]);
/*[*/g.getLocations('safeZone');/*]*/
    g.getCharacters('players', (player) => {
          if (player.id === g.myId()) {
```