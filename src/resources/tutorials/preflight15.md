# Setup Camera to Follow

##### 11. In the `create()` _function_ in `game.js` add the`getCharacters()` function to load the main character and attach a camera to the players movement.

```javascript
// File: game.js
// Copy
  g.getCharacters('players', (player) => {
    if (player.id === g.myId()) {
      g.cameraFollow(player.sprite);
    }
  });
// End Copy
  create() {
    g.setupKeys(keys);
    g.drawBackground('background');/*[*/
    g.getCharacters('players', (player) => {
      if (player.id === g.myId()) {
        g.cameraFollow(player.sprite);
      }
    });/*]*/
  }
```

