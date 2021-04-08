# 4. Set Up Safe Zones
(Step 1/5) To Set up safe zones and an end zone.

##### 1. Go into our `game.js` file and use an `addLocations` _function_ **above** our `addCharacters` function.

<iframe width="560" height="315" src="https://www.youtube.com/embed/BD4Gdtoz7-I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```javascript
// File: code/client/src/game.js
// Copy 
g.addLocations('safeZone');
// End Copy
    g.setSize(GAME_WIDTH, GAME_HEIGHT);
/*[*/g.addLocations('safeZone');/*]*/
    g.addCharacters('players', 0.5);
    g.addCharacters("enemy", .5);
```
