# 6. Set up Scoring
 (Step 1/5) To Set up a scoring system.

##### 1. Go to the `room.js` file and put a `setupCharacters` _function_ in the `onInit` _function_.

```javascript
// File: code/client/src/game.js
// Copy 
g.setupCharacters("team");
// End Copy
    g.setBounds(GAME_WIDTH, GAME_HEIGHT);
/*[*/g.setupCharacters("team");/*]*/
    g.setupLocations('safeZone');
```

<hr class="uk-margin-medium">