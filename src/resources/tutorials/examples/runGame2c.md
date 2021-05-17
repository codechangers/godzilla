# Run Game - 2.C

## Add enemies to your game.

**(Step 3/6)** Setup the enemy characters in your game.

### Setup the enemies.

In the `room.js` file we need to put a `setupCharacters` _function_ in the `onInit` _method_.

```javascript
// File: room.js
// Copy
g.setupCharacters('enemies');
// End Copy
onInit() {
	g.setup(this);
	g.setBounds(GAME_WIDTH, GAME_HEIGHT);
	g.setupCharacters('players');/*[*/
	g.setupCharacters('enemies');/*]*/
}
```
