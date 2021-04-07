# 4. Set Up Safe Zones
(Step 5/5) To Set up safe zones and an end zone.

#### 5. Go into our `onUpdate` _function_ in the `room.js` file and add a `getAllCharacters` _function_ and a `handleLocations` _function_.

```
// File: code/server/rooms/room.js
g.getAllCharacters('players', player =>  { player.safe =  false  });
g.handleLocations('safeZone',  'players');
```

Now when we make it to the end our players are sent back to the first, later we’ll set up level’s so that we progress every time we make it to the end.

<hr class="uk-margin-medium">