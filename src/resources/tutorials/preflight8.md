# Add Images to your Game

##### 4. In the `onInit()` _function_ in `room.js` add functions so that on the backend loads the size of the map and your character.

```javascript
// File: room.js
// Copy
g.setBounds(GAME_WIDTH, GAME_HEIGHT);
g.setupCharacters('players');
// End Copy
onInit() {
  g.setup(this);/*[*/
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players');/*]*/
}
```