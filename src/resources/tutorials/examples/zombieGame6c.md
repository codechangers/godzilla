# 1 Setup Bullets
 (Step 3/10)

##### 3. In `game.js`, Create a `getCharacters()` function to add the bullets to the game in the `create()` function.

``` javascript
// File: code/client/src/game.js
// Copy
g.getCharacters('bullets');
// End Copy
	g.drawBackground( 'background',  3,  500,  2000 );
	g.getCharacters('zombies');/*[*/
	g.getCharacters('bullets');/*]*/
```