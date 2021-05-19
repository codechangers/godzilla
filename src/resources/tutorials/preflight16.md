# Setup Camera to Follow

##### 12. In the `create()` _function_ in `game.js` add a function so that a login screen loads at the start of the game.

```javascript
// File: game.js
// Copy
g.useLoginScreen((name) => g.connect({ name }));
// End Copy
create() {
  g.drawBackground('background');
  g.setupKeys(keys);/*[*/
  g.useLoginScreen((name) => g.connect({ name }));/*]*/
  g.getCharacters('players', (player) => {
    if (player.id === g.myId()) {
      g.cameraFollow(player.sprite);
    }
  });
}
```

