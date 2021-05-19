# Add Keyboard Controls

##### 9. In the `update()` _function_ in `game.js` add the rules for what actions should happen when each key is pressed.
```javascript
// File: game.js
// Copy
if (g.canSend()) {
  g.handleLeaderboard('players', 'Leaderboard');
  const { tab, w, a, s, d, up, down, left, right } = g.getKeysDown();
  if (w || up) g.sendAction('moveUp');
  if (a || left) g.sendAction('moveLeft');
  if (s || down) g.sendAction('moveDown');
  if (d || right) g.sendAction('moveRight');
  if (tab) g.toggleStore();
  else g.unlockStore();
}
// End Copy
  update() {
  /*[*/if (g.canSend()) {
    g.handleLeaderboard('players', 'Leaderboard');
    const { tab, w, a, s, d, up, down, left, right } = g.getKeysDown();
    if (w || up) g.sendAction('moveUp');
    if (a || left) g.sendAction('moveLeft');
    if (s || down) g.sendAction('moveDown');
    if (d || right) g.sendAction('moveRight');
    if (tab) g.toggleStore();
    else g.unlockStore();
  }/*]*/
}
```