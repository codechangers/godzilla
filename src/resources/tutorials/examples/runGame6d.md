# 6. Set up Scoring
 (Step 4/5) To Set up a scoring system.

##### 4. Go into our `room.js` file in the onInit function and use a `createACharacter` _function_ to create our team character.

```javascript
// File: code/server/rooms/room.js
// Copy 
g.createACharacter('team',  'team',  { x:  10000, y:  10000, name:  'Level', score:  1  });
// End Copy
    g.setupCharacters("team");
/*[*/g.createACharacter('team',  'team',  { x:  10000, y:  10000, name:  'Level', score:  1  });/*]*/
    g.setupLocations('safeZone');
```

<hr class="uk-margin-medium">
