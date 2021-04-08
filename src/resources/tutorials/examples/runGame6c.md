# 6. Set up Scoring
 (Step 3/5) To Set up a scoring system.

##### 3. In `game.js`, Add a `getCharacters` function in the create _function_.

```javascript
// File: code/client/src/game.js
// Copy 
g.getCharacters("team");
// End Copy
g.getLocations('safeZone');
/*[*/g.getCharacters("team");/*]*/
g.getCharacters('players', (player) => {
```
<hr class="uk-margin-medium">