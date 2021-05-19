# Soccer Game - 4.A

## Add soccer goals.

**(Step 1/8)** Add soccer goals to your game.

### Add goals characters.

In `game.js` we need to add an `addCharacters` _function_ to our `init` _method_.

```javascript
// File: game.js
// Copy
g.addCharacters('goals', 0.6);
// End Copy
init() {
	g.setup(this);
	g.setSize(GAME_WIDTH, GAME_HEIGHT);
	g.cameraBounds();
	g.addCharacters('players', 0.5);/*[*/
	g.addCharacters('goals', 0.6);/*]*/
}
```
