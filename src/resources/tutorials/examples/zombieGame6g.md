# 1 Setup Bullets
 (Step 7/10)

##### 7. In `game.js`, Make sure your Click Function looks like this.
Now there is only two more things we need to do to make our bullets shoot, first check and make sure your **game.js** file has a `click` _method_ that looks like this:

``` javascript
// File: code/client/src/game.js
// Copy
click(x, y) {  
	g.sendAction('click', {x, y});
}
// End Copy
/*[*/click(x, y) {  
	g.sendAction('click', {x, y});
}/*]*/
```