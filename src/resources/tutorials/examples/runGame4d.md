# 4. Set Up Safe Zones
(Step 4/5) To Set up safe zones and an end zone.

##### 4. In `room.js`, Use 3 `createLocations` _functions_ right **under** the `setupLocations` _function_ that we just wrote, to create three different locations on the map.

<iframe width="560" height="315" src="https://www.youtube.com/embed/BD4Gdtoz7-I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```
// File: code/server/rooms/room.js
// Copy 
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  1940, width:  670, height:  100  },  '6cdc00', player =>  {
	player.safe =  true;
});
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  1000, width:  670, height:  100  },  '6cdc00', player =>  {
	player.safe =  true;
});
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  0, width:  670, height:  100  },  '6cdc00', player =>  {
g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players'  });
});
// End Copy
/*[*/g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  1940, width:  670, height:  100  },  '6cdc00', player =>  {
	player.safe =  true;
});
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  1000, width:  670, height:  100  },  '6cdc00', player =>  {
	player.safe =  true;
});
g.createALocation('safeZone', g.nextLocationId('safeZone'),  { x:  -47, y:  0, width:  670, height:  100  },  '6cdc00', player =>  {
g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players'  });
});/*]*/
```