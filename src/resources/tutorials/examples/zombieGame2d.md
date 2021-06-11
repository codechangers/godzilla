# Zombie Game - 2.D

## Add zombies into your game.

**(Step 4/7)** Setup your zombie characters on the server.

### Setup your zombie characters.

In `room.js`, we need to add a new `setupCharacters` _function_ to the `onInit` _method_.
This will setup our zombie characters on the server!

``` javascript
// File: room.js
// Copy
g.setupCharacters('zombies');
// End Copy
onInit() {
	g.setup(this);
	g.setBounds(GAME_WIDTH, GAME_HEIGHT);
	g.setupCharacters('players');/*[*/
	g.setupCharacters('zombies');/*]*/
}
```
