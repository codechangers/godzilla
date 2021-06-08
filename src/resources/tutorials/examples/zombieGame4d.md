# 4. Setup Bullets
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
	g.setupCharacters('players');
	g.setupCharacters('zombies', 0.5);/*[*/
	g.setupCharacters('bullets');/*]*/
	g.setupCharacters('bullets');
    setInterval(() => g.createACharacter('zombies',
	    g.nextCharacterId('zombies'), {
		  x: Math.floor((Math.random() * 2000) + 1),
		  y: Math.floor((Math.random() * 2000) + 1)
	  }), 2500);
```

    