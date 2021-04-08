# 2. Create Enemies

(Step 3/5) To Learn how to add enenies into your game.

##### 3. In the `game.js` file we need to put an `addCharacters` _function_ in the `init` _function_.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3ItbPbb1ZD8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

```javascript
// File: code/client/src/game.js
// Copy
g.addCharacters('enemy', 0.5);
// End Copy
init() {
  g.setup(this);
  g.setSize(GAME_WIDTH, GAME_HEIGHT);
  g.addCharacters('players', 0.5);/*[*/
  g.addCharacters('enemy', 0.5);/*]*/
}
```
