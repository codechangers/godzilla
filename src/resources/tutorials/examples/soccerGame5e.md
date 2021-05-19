# Soccer Game - 5.E

## Add soccer balls.

**(Step 5/6)** Setup the soccer balls on the server.

### Setup the soccer balls.

In `room.js` we need to add a `setupCharacters` _function_ to the `onInit` _method_.

```javascript
// File: room.js
// Copy
g.setupCharacters('soccerBalls');
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players');
  g.setupCharacters('goals');/*[*/
  g.setupCharacters('soccerBalls');/*]*/
}
```
