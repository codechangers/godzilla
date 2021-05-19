# Soccer Game - 4.F

## Add soccer goals.

**(Step 6/8)** Setup goals on the server.

### Setup goals.

In `room.js` we need to add a `setupCharacters` _function_ to the `onInit` _method_.

```javascript
// File: room.js
// Copy
g.setupCharacters('goals');
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players');/*[*/
  g.setupCharacters('goals');/*]*/
}
```
