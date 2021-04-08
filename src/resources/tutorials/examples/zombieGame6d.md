# 1 Setup Bullets
 (Step 4/10)

##### 4. In `room.js`, Create a `setupCharacters()` function inside the `onInit()` function to set them up on the server.

``` javascript
// File: code/server/rooms/room.js
// Copy
g.setupCharacters('bullets');
// End Copy
onInit() {
	g.setup(this);
	g.setBounds(GAME_WIDTH, GAME_HEIGHT);
	g.setupCharacters('players');/*[*/
	g.setupCharacters('bullets');/*]*/
```