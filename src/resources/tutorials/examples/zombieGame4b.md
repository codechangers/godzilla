# 2. Add Zombies
(Step 2/7)

##### 2. In `room.js`, Add `setupCharacters()` in the `onInit()` function to add zombies.

``` javascript
// File: code/server/rooms/room.js
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
