# Run Game - 2.F

## Add enemies to your game.

**(Step 6/6)** Spawn new enemies into the game.

### Create enemies at random locations.

In `room.js` we need to add a `createACharacter` _function_ for each of the enemies we want to spawn into the game. We can create multiple enemies by putting that _function_ in a _for loop_. This needs to go in our `onInit` _method_ so it runs when the game is started.

```javascript
// File: room.js
// Copy
const enemyCount = 15;
const enemyMaxX  = GAME_WIDTH  - 100;
const enemyMaxY  = GAME_HEIGHT - 100;
for (let i = 0; i < enemyCount; i++) {
  g.createACharacter('enemies',
    g.nextCharacterId('enemies'),
    {
      x: Math.floor(Math.random() * enemyMaxX) + 1,
      y: Math.floor(Math.random() * enemyMaxY) + 1,
    }
  );
}
// End Copy
onInit() {
  g.setup(this);
  g.setBounds(GAME_WIDTH, GAME_HEIGHT);
  g.setupCharacters('players');
  g.setupCharacters('enemies');/*[*/

  const enemyCount = 15;
  const enemyMaxX  = GAME_WIDTH  - 100;
  const enemyMaxY  = GAME_HEIGHT - 100;
  for (let i = 0; i < enemyCount; i++) {
    g.createACharacter('enemies',
      g.nextCharacterId('enemies'),
      {
        x: Math.floor(Math.random() * enemyMaxX) + 1,
        y: Math.floor(Math.random() * enemyMaxY) + 1,
      }
    );
  }
/*]*/
}
```
