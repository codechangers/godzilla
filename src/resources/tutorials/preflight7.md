# Add Images to your Game

##### 3. In the `init()` _function_ in `game.js` set the size of the game map, add boundaries for the camera, and add your main character to the game.

```javascript
// File: game.js
// Copy
g.setSize(GAME_WIDTH, GAME_HEIGHT);
g.cameraBounds();
g.addCharacters('players', 0.5);
// End Copy
init() {
  g.setup(this);/*[*/
  g.setSize(GAME_WIDTH, GAME_HEIGHT);
  g.cameraBounds();
  g.addCharacters('players', 0.5);/*]*/
}
```